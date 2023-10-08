import queryString from 'query-string';
import { BirthchartAnalysisInterface, BirthchartAnalysisGetQueryInterface } from 'interfaces/birthchart-analysis';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBirthchartAnalyses = async (
  query?: BirthchartAnalysisGetQueryInterface,
): Promise<PaginatedInterface<BirthchartAnalysisInterface>> => {
  return fetcher('/api/birthchart-analyses', {}, query);
};

export const createBirthchartAnalysis = async (birthchartAnalysis: BirthchartAnalysisInterface) => {
  return fetcher('/api/birthchart-analyses', { method: 'POST', body: JSON.stringify(birthchartAnalysis) });
};

export const updateBirthchartAnalysisById = async (id: string, birthchartAnalysis: BirthchartAnalysisInterface) => {
  return fetcher(`/api/birthchart-analyses/${id}`, { method: 'PUT', body: JSON.stringify(birthchartAnalysis) });
};

export const getBirthchartAnalysisById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/birthchart-analyses/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteBirthchartAnalysisById = async (id: string) => {
  return fetcher(`/api/birthchart-analyses/${id}`, { method: 'DELETE' });
};
