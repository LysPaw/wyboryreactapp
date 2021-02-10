import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Layout } from '../components/Layout';
import { InputField, PasswordFieldTemplate } from '../components/InputField';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

const Register = () => {
    const router = useRouter();
    const [,register] = useRegisterMutation();

    return (
        <Layout variant="small">
            <Formik 
                initialValues={{ username: '', activationCode: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    console.log(values); 
                    const response = await register(values);
                    console.log(response)
                    if(response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        console.log(response.data?.register.user)
                        router.push('/user-info');
                    }
                }}
            >
                {({ isSubmitting, errors }) => (
                    <Form>
                        <InputField name="username" placeholder="username" label="Username"/>
                        <PasswordFieldTemplate additionalInfo passwordErrorEvent={ typeof errors.password === 'string' }  />
                        <Box mt={4}>
                            <InputField name="activationCode" placeholder="activation code" label="Activation Code" />
                        </Box>
                        
                        <Button mt={4} type="submit" textTransform="capitalize" colorScheme="teal" isLoading={isSubmitting}>Register</Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default withUrqlClient(createUrqlClient)(Register);