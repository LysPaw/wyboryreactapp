import React, { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { LoginMainPage } from '../components/LoginMainPage';
import MainPageTooltip from './mainPageTooltip';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

const Index = () => {
  const [stTooltip, setStTooltip] = useState(true);
  const [ndTooltip, setNdTooltip] = useState(true);
  return (
    <>
      <MainPageTooltip display={stTooltip} onClickFnc={() => setStTooltip(false)}>
        Go to
        <NextLink href="/admin">
          <Link textDecor="underline" ml="6px" _hover={{ color: '#0000ff' }}>
            admin panel
          </Link>
        </NextLink>
        <br />
        to see app from admin side
      </MainPageTooltip>
      <MainPageTooltip display={ndTooltip} onClickFnc={() => setNdTooltip(false)} topCss="160px" variant="green">
        Login: CA1234, password: Testtest01*
        <br /> to login as user
      </MainPageTooltip>
      <LoginMainPage regularUser />
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
