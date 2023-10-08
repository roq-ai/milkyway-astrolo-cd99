import { GetQueryInterface } from 'interfaces';

export interface ReadingHistoryInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface ReadingHistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
}
