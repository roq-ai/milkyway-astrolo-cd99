import { GetQueryInterface } from 'interfaces';

export interface UserProfileInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface UserProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
}
