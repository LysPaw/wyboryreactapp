import React, { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { LoginMainPage } from '../components/LoginMainPage';
import MainPageTooltip from './mainPageTooltip';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

const Admin = () => {
  const [stTooltip, setStTooltip] = useState(true);
  const [ndTooltip, setNdTooltip] = useState(true);
  return (
    <>
      <MainPageTooltip display={stTooltip} onClickFnc={() => setStTooltip(false)}>
        Go back to
        <NextLink href="/">
          <Link textDecor="underline" ml="6px" _hover={{ color: '#0000ff' }}>
            user panel
          </Link>
        </NextLink>
        <br />
        to see app from user side
      </MainPageTooltip>
      <MainPageTooltip display={ndTooltip} onClickFnc={() => setNdTooltip(false)} topCss="160px" variant="green">
        Login: Admin, password: Admin
        <br /> to login as administator
      </MainPageTooltip>

      <LoginMainPage regularUser={false} />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Admin);
