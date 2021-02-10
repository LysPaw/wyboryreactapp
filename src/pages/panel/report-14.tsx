import React, { useState, useEffect } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { AttendanceCheckPage } from '../../components/reportsComponents/attendanceReports/AttendanceCheckPage';
import { useMeQuery } from '../../generated/graphql';
import { ProtectedLayout } from '../../components/Layout';

const Report14 = () => {
  const [userId, setUserId] = useState(0);
  const [{ data }] = useMeQuery();

  useEffect(() => {
    if (data?.me?.id && userId === 0) {
      setUserId(data.me.id);
    }
  }, [data]);

  return (
    <ProtectedLayout>
      {userId !== 0 ? <AttendanceCheckPage username={data?.me?.username || ''} hour={14} /> : null}
    </ProtectedLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Report14);
