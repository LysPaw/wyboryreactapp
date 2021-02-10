import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, Divider, Flex } from '@chakra-ui/react';
import { ProtectedLayout } from '../components/Layout';
import { InputField } from '../components/InputField';
import { useChangeContactInfoMutation, useMeQuery } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { GoBackBtn } from '../components/GoBackBtn';

const ChangeContact = () => {
  const router = useRouter();
  const [, changeContact] = useChangeContactInfoMutation();
  const [{ data }] = useMeQuery();
  const [initContactInfo, setInitContactInfo] = useState({ phone: '', email: '' });

  useEffect(() => {
    if (data?.me?.phoneNumber || data?.me?.emailAdress)
      setInitContactInfo({ phone: data.me.phoneNumber || '', email: data.me.emailAdress || '' });
  }, [data]);

  return (
    <ProtectedLayout variant="small">
      <Formik
        initialValues={{ phoneNumber: '', emailAdress: '' }}
        onSubmit={async (values, { setErrors }) => {
          if (values.phoneNumber === initContactInfo.phone) {
            setErrors({ phoneNumber: 'Phone number remain unchanged.' });
          } else if (values.emailAdress === initContactInfo.email) {
            setErrors({ emailAdress: 'Email adress remain unchanged.' });
          } else {
            const response = await changeContact(values);
            if (response.data?.changeContactInfo.errors) {
              setErrors(toErrorMap(response.data.changeContactInfo.errors));
            } else if (response.data?.changeContactInfo.user) {
              router.push('/panel?success=2');
            }
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <Flex justifyContent="space-between">
              <Box mr="8px">Current phone number:</Box> <Box>{initContactInfo.phone || '-'}</Box>
            </Flex>
            <Divider />
            <Box mt="12px">
              <InputField name="phoneNumber" placeholder="123456789" label="New phone number" />
            </Box>
            <Flex
              mt="16px"
              justifyContent="space-between"
              direction={initContactInfo.email.length < 18 ? 'row' : 'column'}>
              <Box mr="8px">Current adress email:</Box> <Box>{initContactInfo.email || '-'}</Box>
            </Flex>
            <Divider />
            <Box mt="12px">
              <InputField name="emailAdress" placeholder="example@foo" label="New adress email" />
            </Box>

            <Flex justifyContent="space-between">
              <Button mt={4} type="submit" textTransform="capitalize" colorScheme="teal" isLoading={isSubmitting}>
                Change contact
              </Button>

              <GoBackBtn />
            </Flex>
          </Form>
        )}
      </Formik>
    </ProtectedLayout>
  );
};

export default withUrqlClient(createUrqlClient)(ChangeContact);
