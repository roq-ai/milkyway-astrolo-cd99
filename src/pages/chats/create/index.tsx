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

import { createChat } from 'apiSdk/chats';
import { chatValidationSchema } from 'validationSchema/chats';
import { UserInterface } from 'interfaces/user';
import { AstrologerInterface } from 'interfaces/astrologer';
import { getUsers } from 'apiSdk/users';
import { getAstrologers } from 'apiSdk/astrologers';
import { ChatInterface } from 'interfaces/chat';

function ChatCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ChatInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createChat(values);
      resetForm();
      router.push('/chats');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ChatInterface>({
    initialValues: {
      message: '',
      sent_at: new Date(new Date().toDateString()),
      user_id: (router.query.user_id as string) ?? null,
      astrologer_id: (router.query.astrologer_id as string) ?? null,
    },
    validationSchema: chatValidationSchema,
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
              label: 'Chats',
              link: '/chats',
            },
            {
              label: 'Create Chat',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Chat
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.message}
            label={'Message'}
            props={{
              name: 'message',
              placeholder: 'Message',
              value: formik.values?.message,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="sent_at" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Sent At
            </FormLabel>
            <DatePicker
              selected={formik.values?.sent_at ? new Date(formik.values?.sent_at) : null}
              onChange={(value: Date) => formik.setFieldValue('sent_at', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<AstrologerInterface>
            formik={formik}
            name={'astrologer_id'}
            label={'Select Astrologer'}
            placeholder={'Select Astrologer'}
            fetcher={getAstrologers}
            labelField={'name'}
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
              onClick={() => router.push('/chats')}
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
    entity: 'chat',
    operation: AccessOperationEnum.CREATE,
  }),
)(ChatCreatePage);
