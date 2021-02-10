import React from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

type IProps = { display?: boolean; bottomCss?: string; variant?: 'warning' | 'error' };

const DisplayErrorWarning: React.FC<IProps> = ({ display = false, bottomCss = '0', variant = 'error', children }) => {
  if (!display) return null;

  const background = variant === 'warning' ? '#DD6B20' : '#E53E3E';
  return (
    <Box position="fixed" bottom={bottomCss} right="0">
      <Box maxW="560px" minW="300px" margin="0.5rem">
        <Flex
          overflow="hidden"
          paddingLeft="1rem"
          paddingRight="2rem"
          paddingTop="0.75rem"
          paddingBottom="0.75rem"
          background={background}
          color="#FFFFFF"
          borderRadius="0.375rem"
          boxShadow="0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)"
          textAlign="left">
          <Icon as={HiOutlineExclamationCircle} marginRight="0.75rem" width="1.25rem" height="1.5rem" />
          <Box flex="1">{children}</Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default DisplayErrorWarning;
