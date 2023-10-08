import * as yup from 'yup';

export const birthchartAnalysisValidationSchema = yup.object().shape({
  planetary_positions: yup.string().nullable(),
  dominant_planet: yup.string().nullable(),
  analysis_summary: yup.string().nullable(),
  life_path_number: yup.number().integer().nullable(),
});
