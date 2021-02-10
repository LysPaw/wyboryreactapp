import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Icon } from '@chakra-ui/react';
import { HiChevronLeft } from 'react-icons/hi';

export const GoBackBtn = () => {
  return (
    <Box mt={3}>
      <NextLink href="/panel">
        <Link>
          <Icon as={HiChevronLeft} mb={1} />
          Go back
        </Link>
      </NextLink>
    </Box>
  );
};
