import { GetQueryInterface } from 'interfaces';

export interface AstrologyBookInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface AstrologyBookGetQueryInterface extends GetQueryInterface {
  id?: string;
}
