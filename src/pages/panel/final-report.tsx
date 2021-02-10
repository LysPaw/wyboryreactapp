import React, { useState, useEffect } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useMeQuery } from '../../generated/graphql';
import { ProtectedLayout } from '../../components/Layout';
import FinalReportCheckPage from '../../components/reportsComponents/finalReport/FinalReportCheckPage';

const FinalReport = () => {
  const [userId, setUserId] = useState(0);
  const [{ data }] = useMeQuery();

  useEffect(() => {
    if (data?.me?.id && userId === 0) {
      setUserId(data.me.id);
    }
  }, [data]);

  return (
    <ProtectedLayout>
      {userId !== 0 ? <FinalReportCheckPage username={data?.me?.username || ''} /> : null}
    </ProtectedLayout>
  );
};

export default withUrqlClient(createUrqlClient)(FinalReport);
