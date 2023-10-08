import { GetQueryInterface } from 'interfaces';

export interface BirthchartInterpretationInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface BirthchartInterpretationGetQueryInterface extends GetQueryInterface {
  id?: string;
}
