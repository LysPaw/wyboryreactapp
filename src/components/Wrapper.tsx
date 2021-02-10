import React from 'react';
import { Box } from '@chakra-ui/react';

export type WrapperVariant = 'small' | 'regular';

interface IProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<IProps> = ({ children, variant = 'regular' }) => {
  return (
    <Box maxW={variant === 'regular' ? '1120px' : '420px'} w="100%" mt={8} mx="auto" px="5px">
      {children}
    </Box>
  );
};