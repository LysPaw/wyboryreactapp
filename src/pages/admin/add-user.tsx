import React, { useState, useEffect } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { Box, Flex, Button, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputField } from '../../components/InputField';
import { ProtectedLayout } from '../../components/Layout';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';
import { Icon } from '@chakra-ui/react';
import { HiChevronLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useCreateNewUserMutation } from '../../generated/graphql';

const AddUser = () => {
  const router = useRouter();
  const [urlTo, setUrlTo] = useState('/admin/main');
  const [, createNewUser] = useCreateNewUserMutation();

  useEffect(() => {
    if (router.query?.from?.includes('/admin/')) {
      setUrlTo(router.query.from as string);
    }
  }, [router]);
  return (
    <ProtectedLayout privilages variant="small">
      <Formik
        initialValues={{ username: '', firstName: '', secondName: '', lastName: '', phoneNumber: '', emailAdress: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createNewUser(values);
          if (response.data?.createNewUser.errors) {
            setErrors(toErrorMap(response.data.createNewUser.errors));
          } else if (response.data?.createNewUser.preActiveUser) {
            router.push(urlTo);
          }
        }}>
        {({ isSubmitting, errors }) => (
          <Form>
            {console.log(errors)}
            <InputField name="username" placeholder="req.: 2 letters, 4 numbers" label="Username (*)" />
            {errors?.username === 'Incorrect username.' ? (
              <Box color="#E53E3E" fontSize="14px">
                Min. 2 letters, 4 numbers
              </Box>
            ) : null}
            <Box mt={4}>
              <InputField name="firstName" placeholder="First name" label="First name (*)" />
            </Box>
            <Box mt={4}>
              <InputField name="secondName" placeholder="Second name" label="Second name" />
            </Box>
            <Box mt={4}>
              <InputField name="lastName" placeholder="Last name" label="Last name (*)" />
            </Box>
            <Box mt={4}>
              <InputField name="phoneNumber" placeholder="123456789" label="Phone number" />
            </Box>
            <Box mt={4}>
              <InputField name="emailAdress" placeholder="example@foo" label="Adress email" />
            </Box>

            <Flex justifyContent="space-between">
              <Button mt={4} type="submit" textTransform="capitalize" colorScheme="teal" isLoading={isSubmitting}>
                Create new user
              </Button>

              <Box mt={3}>
                <NextLink href={urlTo}>
                  <Link>
                    <Icon as={HiChevronLeft} mb={1} />
                    Go back
                  </Link>
                </NextLink>
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </ProtectedLayout>
  );
};

export default withUrqlClient(createUrqlClient)(AddUser);
