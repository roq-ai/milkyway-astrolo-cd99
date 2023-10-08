import queryString from 'query-string';
import { AstrologyBookInterface, AstrologyBookGetQueryInterface } from 'interfaces/astrology-book';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAstrologyBooks = async (
  query?: AstrologyBookGetQueryInterface,
): Promise<PaginatedInterface<AstrologyBookInterface>> => {
  return fetcher('/api/astrology-books', {}, query);
};

export const createAstrologyBook = async (astrologyBook: AstrologyBookInterface) => {
  return fetcher('/api/astrology-books', { method: 'POST', body: JSON.stringify(astrologyBook) });
};

export const updateAstrologyBookById = async (id: string, astrologyBook: AstrologyBookInterface) => {
  return fetcher(`/api/astrology-books/${id}`, { method: 'PUT', body: JSON.stringify(astrologyBook) });
};

export const getAstrologyBookById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/astrology-books/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteAstrologyBookById = async (id: string) => {
  return fetcher(`/api/astrology-books/${id}`, { method: 'DELETE' });
};
