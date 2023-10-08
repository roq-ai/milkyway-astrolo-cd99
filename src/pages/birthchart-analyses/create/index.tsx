import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createBirthchartAnalysis } from 'apiSdk/birthchart-analyses';
import { birthchartAnalysisValidationSchema } from 'validationSchema/birthchart-analyses';
import { BirthchartAnalysisInterface } from 'interfaces/birthchart-analysis';

function BirthchartAnalysisCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BirthchartAnalysisInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBirthchartAnalysis(values);
      resetForm();
      router.push('/birthchart-analyses');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BirthchartAnalysisInterface>({
    initialValues: {
      planetary_positions: '',
      dominant_planet: '',
      analysis_summary: '',
      life_path_number: 0,
    },
    validationSchema: birthchartAnalysisValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Birthchart Analyses',
              link: '/birthchart-analyses',
            },
            {
              label: 'Create Birthchart Analysis',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Birthchart Analysis
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.planetary_positions}
            label={'Planetary Positions'}
            props={{
              name: 'planetary_positions',
              placeholder: 'Planetary Positions',
              value: formik.values?.planetary_positions,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.dominant_planet}
            label={'Dominant Planet'}
            props={{
              name: 'dominant_planet',
              placeholder: 'Dominant Planet',
              value: formik.values?.dominant_planet,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.analysis_summary}
            label={'Analysis Summary'}
            props={{
              name: 'analysis_summary',
              placeholder: 'Analysis Summary',
              value: formik.values?.analysis_summary,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Life Path Number"
            formControlProps={{
              id: 'life_path_number',
              isInvalid: !!formik.errors?.life_path_number,
            }}
            name="life_path_number"
            error={formik.errors?.life_path_number}
            value={formik.values?.life_path_number}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('life_path_number', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/birthchart-analyses')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'birthchart_analysis',
    operation: AccessOperationEnum.CREATE,
  }),
)(BirthchartAnalysisCreatePage);
