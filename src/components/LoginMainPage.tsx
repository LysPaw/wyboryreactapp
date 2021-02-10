import React from 'react';
import { Form, Formik } from 'formik';
import { Layout } from '../components/Layout';
import { useRouter } from 'next/router';
import { Flex, Box, Button, Link } from '@chakra-ui/react';
import { InputField, PasswordFieldTemplate } from '../components/InputField';
import NextLink from 'next/link';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';

type IProps = { regularUser?: boolean };

export const LoginMainPage: React.FC<IProps> = ({ regularUser = true }) => {
  const router = useRouter();
  const [, login] = useLoginMutation();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, { setErrors }) => {
        const response = regularUser ? await login(values) : await login({ ...values, privilages: true });
        if (response.data?.login.errors) {
          setErrors(toErrorMap(response.data.login.errors));
        } else if (response.data?.login.user) {
          router.push(regularUser ? '/panel' : '/admin/main');
        }
      }}>
      {({ isSubmitting }) => (
        <Layout variant="small">
          {!regularUser && (
            <Box fontSize="20px" fontWeight="500" mb="15px">
              Administration panel
            </Box>
          )}
          <Form>
            <InputField name="username" placeholder="Username" label="Username" />
            <PasswordFieldTemplate />
            <Flex justifyContent="space-between">
              <Button type="submit" textTransform="capitalize" colorScheme="teal" mt={4} isLoading={isSubmitting}>
                login
              </Button>
              {regularUser ? (
                <Flex flexDir="column" mt={2} alignItems="flex-end">
                  <Box mt={2}>
                    <NextLink href="/register">
                      <Link>Create new account.</Link>
                    </NextLink>
                  </Box>
                </Flex>
              ) : null}
            </Flex>
          </Form>
        </Layout>
      )}
    </Formik>
  );
};
