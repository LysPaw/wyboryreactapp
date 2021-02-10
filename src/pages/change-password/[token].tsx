import React, { useState } from 'react';
import { Wrapper } from '../../components/Wrapper';
import { Formik, Form } from 'formik';
import { PasswordFieldTemplate } from '../../components/InputField';
import { useChangePasswordWithTokenMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { useRouter } from 'next/router';
import { Box, Button, Flex } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';

const ChangePassword = () => {
  const router = useRouter();
  const [tokenError, setTokenError] = useState('');
  const [failure, setFailure] = useState(false);
  const [, changePassword] = useChangePasswordWithTokenMutation();
  return (
    <Formik
      initialValues={{ password: '' }}
      onSubmit={async (values, { setErrors }) => {
        const response = await changePassword({
          newPassword: values.password,
          token: typeof router.query.token === 'string' ? router.query.token : '',
        });
        if (response.data?.changePasswordWithToken.errors) {
          const errorMap = toErrorMap(response.data.changePasswordWithToken.errors);
          if ('token' in errorMap) {
            setTokenError(errorMap.token);
            const message = response.data.changePasswordWithToken.errors[0].message;
            if (message.includes('Token expired') || message.includes('User no longer exist')) setFailure(true);
          }
          setErrors(errorMap);
        } else if (response.data?.changePasswordWithToken.user) {
          router.push('/panel');
        }
      }}>
      {({ isSubmitting }) => (
        <Wrapper variant="small">
          {failure && (
            <Flex>
              <Box
                as="a"
                mt="0.5rem"
                color="rgb(240,80,120)"
                cursor="pointer"
                _hover={{
                  color: 'rgb(220,20,60)',
                  textDecoration: 'underline',
                }}
                onClick={() => {
                  router.push('/');
                }}>
                Critical error. Contact with your administrator.
              </Box>
            </Flex>
          )}
          <Form>
            <PasswordFieldTemplate />
            {tokenError && (
              <Box>
                <Box style={{ color: 'red' }}>{tokenError}</Box>
              </Box>
            )}
            <Button
              type="submit"
              textTransform="capitalize"
              colorScheme="teal"
              mt={4}
              isLoading={isSubmitting}
              disabled={failure}>
              login
            </Button>
          </Form>
        </Wrapper>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
