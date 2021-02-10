import React, { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { LoginMainPage } from '../components/LoginMainPage';
import MainPageTooltip from './mainPageTooltip';

const Admin = () => {
  const [tooltip, setTooltip] = useState(true);
  return (
    <>
      <MainPageTooltip display={tooltip} onClickFnc={() => setTooltip(false)}>
        Login: Admin, password: Admin
        <br /> to login as administator
      </MainPageTooltip>
      <LoginMainPage regularUser={false} />
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Admin);
