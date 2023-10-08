import queryString from 'query-string';
import { ReadingHistoryInterface, ReadingHistoryGetQueryInterface } from 'interfaces/reading-history';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getReadingHistories = async (
  query?: ReadingHistoryGetQueryInterface,
): Promise<PaginatedInterface<ReadingHistoryInterface>> => {
  return fetcher('/api/reading-histories', {}, query);
};

export const createReadingHistory = async (readingHistory: ReadingHistoryInterface) => {
  return fetcher('/api/reading-histories', { method: 'POST', body: JSON.stringify(readingHistory) });
};

export const updateReadingHistoryById = async (id: string, readingHistory: ReadingHistoryInterface) => {
  return fetcher(`/api/reading-histories/${id}`, { method: 'PUT', body: JSON.stringify(readingHistory) });
};

export const getReadingHistoryById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/reading-histories/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteReadingHistoryById = async (id: string) => {
  return fetcher(`/api/reading-histories/${id}`, { method: 'DELETE' });
};
