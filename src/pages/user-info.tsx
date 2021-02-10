import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { InputField } from '../components/InputField';
import { useChangeContactInfoMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

const UserInfo = () => {
  const router = useRouter();
  const [, changeContactInfo] = useChangeContactInfoMutation();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ phoneNumber: '', emailAdress: '' }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await changeContactInfo(values);
          if (response.data?.changeContactInfo.errors) {
            setErrors(toErrorMap(response.data.changeContactInfo.errors));
          } else if (response.data?.changeContactInfo.user) {
            router.push('/panel');
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField name="phoneNumber" placeholder="phone number" label="Phone number" />
            <Box mt={4}>
              <InputField name="emailAdress" placeholder="email adress" label="Email adress" />
            </Box>

            <Flex justifyContent="space-between" mt={4}>
              <Button type="submit" textTransform="capitalize" colorScheme="teal" isLoading={isSubmitting}>
                Change
              </Button>
              <Button px={7} textTransform="capitalize" colorScheme="pink" onClick={() => router.push('/')}>
                Skip
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(UserInfo);
