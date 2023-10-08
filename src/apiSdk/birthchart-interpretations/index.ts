import queryString from 'query-string';
import {
  BirthchartInterpretationInterface,
  BirthchartInterpretationGetQueryInterface,
} from 'interfaces/birthchart-interpretation';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBirthchartInterpretations = async (
  query?: BirthchartInterpretationGetQueryInterface,
): Promise<PaginatedInterface<BirthchartInterpretationInterface>> => {
  return fetcher('/api/birthchart-interpretations', {}, query);
};

export const createBirthchartInterpretation = async (birthchartInterpretation: BirthchartInterpretationInterface) => {
  return fetcher('/api/birthchart-interpretations', { method: 'POST', body: JSON.stringify(birthchartInterpretation) });
};

export const updateBirthchartInterpretationById = async (
  id: string,
  birthchartInterpretation: BirthchartInterpretationInterface,
) => {
  return fetcher(`/api/birthchart-interpretations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(birthchartInterpretation),
  });
};

export const getBirthchartInterpretationById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/birthchart-interpretations/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteBirthchartInterpretationById = async (id: string) => {
  return fetcher(`/api/birthchart-interpretations/${id}`, { method: 'DELETE' });
};
