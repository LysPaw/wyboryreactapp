import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { IData, DisplayList } from '../../components/adminComponents/adminDisplayOptions/DisplayList';
import {
  useAssignOperatorMutation,
  useDeleteConstituencyMutation,
  useChangeConstituencyInfoMutation,
  useGetListOfConstituenciesQuery,
  useClearAssignedOperatorMutation,
} from '../../generated/graphql';

const Constituencies = () => {
  const [, assignOperator] = useAssignOperatorMutation();
  const [, clearAssignedOperator] = useClearAssignedOperatorMutation();
  const [, changeConstituencyInfo] = useChangeConstituencyInfoMutation();
  const [, deleteConstituency] = useDeleteConstituencyMutation();
  const [{ data, fetching }] = useGetListOfConstituenciesQuery();

  let constituencies = data?.getListOfConstituencies || [];
  constituencies = constituencies.map((value) => {
    return { ...value, typename: 'Constituency' };
  });

  return (
    <DisplayList
      title="List of constituencies"
      titleOptions={{ main: 'ID', secondary: 'Adress', tertiary: 'Operators' }}
      data={(constituencies as unknown) as IData[]}
      fetching={fetching}
      onChangeDataMutation={changeConstituencyInfo}
      onDeleteDataMutation={deleteConstituency}
      onAssignOperatorMutation={assignOperator}
      onClearAssignedOperatorMutation={clearAssignedOperator}
    />
  );
};

export default withUrqlClient(createUrqlClient)(Constituencies);
