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
import { useCreateNewConstituencyMutation } from '../../generated/graphql';

const AddConstituency = () => {
  const router = useRouter();
  const [urlTo, setUrlTo] = useState('/admin/main');
  const [, createNewConstituency] = useCreateNewConstituencyMutation();
  console.log(urlTo);
  useEffect(() => {
    if (router.query?.from?.includes('/admin/')) {
      setUrlTo(router.query.from as string);
    }
  }, [router]);
  return (
    <ProtectedLayout privilages variant="small">
      <Formik
        initialValues={{ constituencyId: '', adress: '', electorate: '' }}
        onSubmit={async (values, { setErrors }) => {
          if (!values.constituencyId) {
            setErrors(toErrorMap([{ field: 'constituencyId', message: "This field can't be empty." }]));
          } else if (!values.electorate) {
            setErrors(toErrorMap([{ field: 'electorate', message: "This field can't be empty." }]));
          } else {
            const response = await createNewConstituency({
              id: parseInt(values.constituencyId),
              electorate: parseInt(values.electorate),
              adress: values.adress,
            });
            if (response.data?.createNewConstituency.errors) {
              setErrors(toErrorMap(response.data.createNewConstituency.errors));
            } else if (response.data?.createNewConstituency.constituency) {
              router.push(urlTo);
            }
          }
        }}>
        {({ isSubmitting, errors }) => (
          <Form>
            {console.log(errors)}
            <InputField name="constituencyId" placeholder="full number" label="ID (*)" type="number" />
            <Box mt={4}>
              <InputField name="adress" placeholder="Adress..." label="Adress" />
            </Box>
            <Box mt={4}>
              <InputField name="electorate" placeholder="Number of voters" label="Electorate" type="number" />
            </Box>

            <Flex justifyContent="space-between">
              <Button mt={4} type="submit" textTransform="capitalize" colorScheme="teal" isLoading={isSubmitting}>
                Create new constituency
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

export default withUrqlClient(createUrqlClient)(AddConstituency);
