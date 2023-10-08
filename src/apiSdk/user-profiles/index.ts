import queryString from 'query-string';
import { UserProfileInterface, UserProfileGetQueryInterface } from 'interfaces/user-profile';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getUserProfiles = async (
  query?: UserProfileGetQueryInterface,
): Promise<PaginatedInterface<UserProfileInterface>> => {
  return fetcher('/api/user-profiles', {}, query);
};

export const createUserProfile = async (userProfile: UserProfileInterface) => {
  return fetcher('/api/user-profiles', { method: 'POST', body: JSON.stringify(userProfile) });
};

export const updateUserProfileById = async (id: string, userProfile: UserProfileInterface) => {
  return fetcher(`/api/user-profiles/${id}`, { method: 'PUT', body: JSON.stringify(userProfile) });
};

export const getUserProfileById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/user-profiles/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteUserProfileById = async (id: string) => {
  return fetcher(`/api/user-profiles/${id}`, { method: 'DELETE' });
};
