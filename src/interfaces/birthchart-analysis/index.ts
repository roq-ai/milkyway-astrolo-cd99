import { GetQueryInterface } from 'interfaces';

export interface BirthchartAnalysisInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  planetary_positions?: string;
  dominant_planet?: string;
  analysis_summary?: string;
  life_path_number?: number;

  _count?: {};
}

export interface BirthchartAnalysisGetQueryInterface extends GetQueryInterface {
  id?: string;
  planetary_positions?: string;
  dominant_planet?: string;
  analysis_summary?: string;
}
