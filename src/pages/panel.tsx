import React, { useState, useEffect } from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import { ProtectedLayout } from '../components/Layout';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link';
import { Icon } from '@chakra-ui/react';
import { BsFileEarmark, BsCardList } from 'react-icons/bs';
import { StyledLink } from '../components/styledComponents/styledLink';

const Panel = () => {
  const router = useRouter();
  const [querySuccess, setQuerySuccess] = useState(0);

  useEffect(() => {
    if (router.query?.success === '1') {
      setQuerySuccess(1);
    } else if (router.query?.success === '2') {
      setQuerySuccess(2);
    }
  }, [router]);

  const displayHelperTable = (hour: string, urlLink: string) => {
    return (
      <Box w="95%" mx="auto" border="2px solid #0b5f97" borderRadius="5px">
        <Flex p="6px" bgColor="#0b5f97" alignItems="center">
          <Icon as={BsCardList} />
          <Box ml="6px">Attendance</Box>
          <Box ml="6px">{hour}</Box>
        </Flex>
        <Flex alignItems="center" justifyContent="center" minH="80px">
          <NextLink href={urlLink}>
            <Link {...StyledLink}>Check attendance</Link>
          </NextLink>
        </Flex>
      </Box>
    );
  };

  return (
    <ProtectedLayout>
      {querySuccess ? (
        <Flex ml="14px">
          <Box
            as="a"
            m="0.5rem 0"
            color="rgb(94,188,94)"
            cursor="pointer"
            _hover={{
              color: 'rgb(34,139,34)',
              textDecoration: 'underline',
            }}
            onClick={() => {
              setQuerySuccess(0);
              router.push('/panel');
            }}>
            {querySuccess === 1 ? 'Password successfully changed.' : 'Contact info successfully changed.'}
          </Box>
        </Flex>
      ) : null}
      <Box color="white">
        <Flex flexWrap="wrap">
          <Box flex="1" pb="5px">
            {displayHelperTable('12:00:00', '/panel/report-14')}
          </Box>
          <Box flex="1">{displayHelperTable('17:00:00', '/panel/report-17')}</Box>
        </Flex>
        <Box mt="15px">
          <Box w="97.5%" mx="auto">
            <Flex p="6px" bgColor="#0b5f97" borderTopRadius="5px" alignItems="center">
              <Icon as={BsFileEarmark} />
              <Box ml="6px" fontSize={{ base: '15px', sm: '16px' }} textAlign="center">
                District electoral commissions protocols
              </Box>
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="center"
              minH="80px"
              border="2px solid #0b5f97"
              borderBottomRadius="5px">
              <NextLink href="/panel/final-report">
                <Link
                  {...StyledLink}
                  bgColor="#1a9916"
                  _hover={{ backgroundColor: '#0c6d09' }}
                  border="1px solid #0c6d09">
                  Check yours protocols
                </Link>
              </NextLink>
            </Flex>
          </Box>
        </Box>
      </Box>
    </ProtectedLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Panel);
