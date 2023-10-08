import { GetQueryInterface } from 'interfaces';

export interface ReadingScheduleInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface ReadingScheduleGetQueryInterface extends GetQueryInterface {
  id?: string;
}
