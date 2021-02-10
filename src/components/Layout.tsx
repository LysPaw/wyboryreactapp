import React from 'react';
import { Wrapper, WrapperVariant } from './Wrapper';
import { NavBar } from './NavBar';
import { Flex, Spinner } from '@chakra-ui/react';
import { useIsAdminAuth, useIsUserAuth } from '../utils/useIsUserAuth';

interface IProps {
  variant?: WrapperVariant;
}

export const Layout: React.FC<IProps> = ({ variant, children }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

type IProtectedProps = IProps & { privilages?: boolean };

export const ProtectedLayout: React.FC<IProtectedProps> = ({ variant, privilages = false, children }) => {
  const response = privilages ? useIsAdminAuth() : useIsUserAuth();
  
  if (!response) {
    children = (
      <Flex justifyContent="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return <Layout variant={variant}>{children}</Layout>;
};
