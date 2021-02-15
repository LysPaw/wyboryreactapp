import React from 'react';
import { Box, Divider, Flex } from '@chakra-ui/react';
import { ProtectedLayout } from '../Layout';
import ContactForm from './ContactForm';

const TechHelpDisplay = ({ privilages = false }: { privilages?: boolean }) => {
  return (
    <ProtectedLayout privilages={privilages} variant="small">
      <ContactForm
        title="Technical Support"
        underTitle="Contact with technical support possible only in the election day"
        email="techsupp@xyz.zy"
        phone="123456789">
        <>
          <Divider />
          <Box mt="5px" fontWeight="500" fontSize="18px" mr="10px">
            Alternatively contact with us directly through San Escobar office
          </Box>
          <Flex mr="15px" justifyContent="space-between" mt="15px">
            <Box mr="10px">E-mail</Box>
            <Box>sanescobar@xyz.zy</Box>
          </Flex>
          <Flex mr="15px" justifyContent="space-between" mt="10px">
            <Box>Phone number</Box>
            <Box>987654321</Box>
          </Flex>
          <Flex mr="15px" justifyContent="flex-end" mt="10px" mb="15px">
            9181 San Escobar St. Blacksburg, SE 24060
          </Flex>
        </>
      </ContactForm>
    </ProtectedLayout>
  );
};

export default TechHelpDisplay;
