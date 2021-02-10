import { Box, Divider, Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';

type IProps = {
  title: string;
  underTitle?: string;
  email: string;
  phone: string;
};

const ContactForm: React.FC<IProps> = ({ title, underTitle, email, phone, children }) => {
  return (
    <Box>
      <Box fontSize="20px" fontWeight="500" mb={underTitle ? '0' : '5px'}>
        {title}
      </Box>
      {underTitle && (
        <Box mb="5px" fontSize="14px" color="#727272">
          {underTitle}
        </Box>
      )}
      <Divider />
      <Flex {...flexStyle} mt="15px">
        <Box mr="10px">E-mail</Box>
        <Box>{email}</Box>
      </Flex>
      <Flex {...flexStyle} mt="10px" mb="15px">
        <Box>Phone number</Box>
        <Box>{phone}</Box>
      </Flex>
      {children}
    </Box>
  );
};

export default ContactForm;

const flexStyle: FlexProps = {
  mr: '15px',
  justifyContent: 'space-between',
};
