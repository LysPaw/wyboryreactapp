import React, { useEffect } from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import NextLink from 'next/link';
import { Icon } from '@chakra-ui/react';
import { HiUserGroup } from 'react-icons/hi';
import { isServer } from '../utils/isServer';
import { useRouter } from 'next/router';
import { NavButton } from './navBarComponents/NavButton';
import { StyledLink } from './styledComponents/navBarStyle';

export const NavBar = () => {
  const router = useRouter();

  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  useEffect(() => {
    const path = router.pathname;
    if (data?.me && data?.me.username !== 'Admin') {
      if (path === '/' || path === '/register' || path.includes('/admin')) {
        router.replace('/panel');
      }
    }
    if (data?.me?.username === 'Admin') {
      if (path === '/' || path === '/admin' || !path.includes('/admin/')) router.replace('/admin/main');
    }
  }, [router, data]);

  let body = null;

  //data is loading
  if (fetching) {
    //user is not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/">
          <Link {...StyledLink} mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link {...StyledLink}>Register</Link>
        </NextLink>
      </>
    );
    //user is logged in
  } else {
    const BtnMenu1 =
      data?.me?.username !== 'Admin'
        ? [
            { href: '/panel/terms', name: 'Terms of use' },
            { href: '/change-password', name: 'Change password' },
            { href: '/change-contact', name: 'Change contact info' },
          ]
        : [
            { href: '/admin/users', name: 'Manage operators' },
            { href: '/admin/constituencies', name: 'Manage constituencies' },
            { href: '/admin/reports', name: 'Check reports' },
          ];
    const BtnMenu2 =
      data?.me?.username !== 'Admin'
        ? [
            { href: '/contact/help', name: 'Contact administator' },
            { href: '/contact/techhelp', name: 'Technical support' },
          ]
        : [{ href: '/contact/techhelp', name: 'Technical support' }];

    body = (
      <Flex>
        <NavButton
          content={
            <>
              <Box display={{ base: 'none', sm: 'initial' }}>My account </Box>
              <Box ml="4px">({data?.me?.username})</Box>
            </>
          }
          menuContent={BtnMenu1}
          fetching={logoutFetching}
          logoutFnc={logout}
        />
        <NavButton content={<Box>Help</Box>} menuContent={BtnMenu2} />
      </Flex>
    );
  }
  return (
    <Box bg="#454545" color="#999999" px={4} py={data?.me ? 0 : 2}>
      <Flex alignItems="center" maxW="1360px" mx="auto">
        <NextLink href={data?.me?.username === 'Admin' ? '/admin/main' : data?.me ? '/panel' : '/'}>
          <Link _hover={{ color: 'rgb(215, 215, 215)', textDecoration: 'none' }}>
            <Box fontWeight="500" padding=".5rem 0" fontSize={{ base: '16px', sm: '22px' }} userSelect="none">
              WOW <Icon as={HiUserGroup} w={{ base: 4, sm: 6 }} mt={-2} />
            </Box>
          </Link>
        </NextLink>
        <Box ml="auto" mr=".5rem">
          {body}
        </Box>
      </Flex>
    </Box>
  );
};
