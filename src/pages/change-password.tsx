import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Flex } from '@chakra-ui/react';
import { ProtectedLayout } from '../components/Layout';
import { PasswordFieldTemplate } from '../components/InputField';
import { useChangePasswordMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { GoBackBtn } from '../components/GoBackBtn';

const ChangePassword = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();

  return (
    <ProtectedLayout variant="small">
      <Formik
        initialValues={{ oldPassword: '', newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword(values);
          if (response.data?.changePassword.errors) {
            setErrors(toErrorMap(response.data.changePassword.errors));
          } else if (response.data?.changePassword.user) {
            router.push('/panel?success=1');
          }
        }}>
        {({ isSubmitting, errors }) => (
          <Form>
            <PasswordFieldTemplate
              passwordDetails={{
                name: 'oldPassword',
                placeholder: 'Enter your current password',
                label: 'Current password',
              }}
            />
            <PasswordFieldTemplate
              additionalInfo
              passwordErrorEvent={typeof errors.newPassword === 'string'}
              passwordDetails={{ name: 'newPassword', placeholder: 'Enter your new password', label: 'New password' }}
            />

            <Flex justifyContent="space-between">
              <Button mt={4} type="submit" textTransform="capitalize" colorScheme="teal" isLoading={isSubmitting}>
                Change password
              </Button>
              <GoBackBtn />
            </Flex>
          </Form>
        )}
      </Formik>
    </ProtectedLayout>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
