import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { DisplayList, IData } from '../../components/adminComponents/adminDisplayOptions/DisplayList';
import { useChangeUserInfoDataMutation, useDeleteUserMutation, useGetListOfUserQuery } from '../../generated/graphql';

const Users = () => {
  const [, changeUserInfoData] = useChangeUserInfoDataMutation();
  const [, deleteUser] = useDeleteUserMutation();
  const [{ data, fetching }] = useGetListOfUserQuery();

  let users = data?.getListOfUser?.users || [];
  users = users.map((value) => {
    return { ...value, typename: 'User' };
  });
  let unregisteredUsers = data?.getListOfUser?.unregisteredUsers || [];
  unregisteredUsers = unregisteredUsers.map((value) => {
    return { ...value, typename: 'PreActivatedUser' };
  });
  const combinedObj: IData[] = (users.concat(unregisteredUsers as typeof users) as unknown) as IData[];

  return (
    <DisplayList
      title="List of users"
      data={combinedObj}
      fetching={fetching}
      onChangeDataMutation={changeUserInfoData}
      onDeleteDataMutation={deleteUser}
    />
  );
};

export default withUrqlClient(createUrqlClient)(Users);
