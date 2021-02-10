import React from 'react';
import { Box, Container, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

type IProps = { display: boolean; menuContent: Record<string, string>[]; logoutFnc?: () => void };

export const NavContainer: React.FC<IProps> = ({ display, menuContent, logoutFnc }) => {
  if (!display) return null;
  const router = useRouter();

  return (
    <Container
      pos="absolute"
      right={{ base: '0', lg: '0' }}
      top={{ base: '53px', lg: '53px' }}
      padding="1px 0"
      w="100%"
      color="black"
      textAlign="left"
      bg="white"
      minW="fit-content"
      zIndex={3}
      border="1px solid rgba(108, 122, 137, .6)"
      boxShadow="rgba(0, 0, 0, 0.08) 0px 0px 2px 1px, rgba(0, 0, 0, 0.16) 0px 4px 8px 0px">
      <ul style={{ listStyle: 'none' }}>
        {menuContent.map((content, index) => {
          return (
            <li style={{ margin: '0 1px' }} key={index}>
              <NextLink href={content.href}>
                <Link
                  appearance="button"
                  w="100%"
                  textAlign="left"
                  padding="6px 10px"
                  _hover={{ bg: 'rgb(226, 226, 226)' }}>
                  {content.name}
                </Link>
              </NextLink>
            </li>
          );
        })}
        {logoutFnc ? (
          <li
            onClick={async () => {
              await logoutFnc();
              await router.push('/');
            }}
            style={{ borderTop: '1px solid rgba(108, 122, 137, .6)', padding: '2px 1px', marginTop: '2px' }}>
            <Box w="100%" textAlign="left" padding="6px 10px" _hover={{ bg: 'rgb(226, 226, 226)' }}>
              Log out
            </Box>
          </li>
        ) : null}
      </ul>
    </Container>
  );
};
