import queryString from 'query-string';
import { ReadingScheduleInterface, ReadingScheduleGetQueryInterface } from 'interfaces/reading-schedule';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getReadingSchedules = async (
  query?: ReadingScheduleGetQueryInterface,
): Promise<PaginatedInterface<ReadingScheduleInterface>> => {
  return fetcher('/api/reading-schedules', {}, query);
};

export const createReadingSchedule = async (readingSchedule: ReadingScheduleInterface) => {
  return fetcher('/api/reading-schedules', { method: 'POST', body: JSON.stringify(readingSchedule) });
};

export const updateReadingScheduleById = async (id: string, readingSchedule: ReadingScheduleInterface) => {
  return fetcher(`/api/reading-schedules/${id}`, { method: 'PUT', body: JSON.stringify(readingSchedule) });
};

export const getReadingScheduleById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/reading-schedules/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteReadingScheduleById = async (id: string) => {
  return fetcher(`/api/reading-schedules/${id}`, { method: 'DELETE' });
};
