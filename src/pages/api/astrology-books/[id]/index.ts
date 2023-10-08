import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { astrologyBookValidationSchema } from 'validationSchema/astrology-books';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.astrology_book
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getAstrologyBookById();
    case 'PUT':
      return updateAstrologyBookById();
    case 'DELETE':
      return deleteAstrologyBookById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAstrologyBookById() {
    const data = await prisma.astrology_book.findFirst(convertQueryToPrismaUtil(req.query, 'astrology_book'));
    return res.status(200).json(data);
  }

  async function updateAstrologyBookById() {
    await astrologyBookValidationSchema.validate(req.body);
    const data = await prisma.astrology_book.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteAstrologyBookById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.astrology_book.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
