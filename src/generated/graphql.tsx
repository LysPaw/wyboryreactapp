import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getListOfUser?: Maybe<AllUsers>;
  getUser?: Maybe<User>;
  getListOfConstituencies?: Maybe<Array<Constituency>>;
  getConstituency?: Maybe<Array<Constituency>>;
  getReports?: Maybe<Array<ReportResponse>>;
};


export type QueryGetUserArgs = {
  userId: Scalars['Float'];
};


export type QueryGetReportsArgs = {
  operatorId?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  secondName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
  emailAdress: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  constituenciesIds?: Maybe<Scalars['String']>;
};

export type AllUsers = {
  __typename?: 'AllUsers';
  users?: Maybe<Array<User>>;
  unregisteredUsers?: Maybe<Array<PreActivatedUser>>;
};

export type PreActivatedUser = {
  __typename?: 'PreActivatedUser';
  id: Scalars['Int'];
  username: Scalars['String'];
  activationCode: Scalars['String'];
  firstName: Scalars['String'];
  secondName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
  emailAdress: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Constituency = {
  __typename?: 'Constituency';
  id: Scalars['Int'];
  adress: Scalars['String'];
  electorate: Scalars['Int'];
  votersAt14?: Maybe<Scalars['Int']>;
  cardVotersAt14?: Maybe<Scalars['Int']>;
  votersAt17?: Maybe<Scalars['Int']>;
  cardVotersAt17?: Maybe<Scalars['Int']>;
  finalReport?: Maybe<Scalars['String']>;
  operator?: Maybe<User>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ReportResponse = {
  __typename?: 'ReportResponse';
  report?: Maybe<Scalars['String']>;
  adress: Scalars['String'];
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  changePasswordWithToken: UserResponse;
  changePassword: UserResponse;
  changeContactInfo: UserResponse;
  createNewUser: AdminResponse;
  changeUserInfoData?: Maybe<User>;
  deleteUser: Scalars['Boolean'];
  resetPassword: Scalars['String'];
  createNewConstituency: ConstituencyResponse;
  deleteConstituency: Scalars['Boolean'];
  assignOperator: ConstituencyResponse;
  clearAssignedOperator: ConstituencyResponse;
  changeConstituencyInfo: ConstituencyResponse;
  updateVoters?: Maybe<ConstituencyResponse>;
  updateCardVoters?: Maybe<ConstituencyResponse>;
  saveProtocol?: Maybe<ConstituencyResponse>;
  deleteProtocol?: Maybe<ConstituencyResponse>;
};


export type MutationLoginArgs = {
  privilages?: Maybe<Scalars['Boolean']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  activationCode: Scalars['String'];
  username: Scalars['String'];
};


export type MutationChangePasswordWithTokenArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationChangeContactInfoArgs = {
  emailAdress?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};


export type MutationCreateNewUserArgs = {
  emailAdress?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  secondName?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  username: Scalars['String'];
};


export type MutationChangeUserInfoDataArgs = {
  emailAdress?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  secondName?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  username: Scalars['String'];
  id: Scalars['Int'];
  userType: Scalars['Boolean'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
  username: Scalars['String'];
  userType: Scalars['Boolean'];
};


export type MutationResetPasswordArgs = {
  username: Scalars['String'];
};


export type MutationCreateNewConstituencyArgs = {
  adress: Scalars['String'];
  electorate: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationDeleteConstituencyArgs = {
  id: Scalars['Int'];
};


export type MutationAssignOperatorArgs = {
  userId: Scalars['Int'];
  constituencyId: Scalars['Int'];
};


export type MutationClearAssignedOperatorArgs = {
  constituencyId: Scalars['Int'];
};


export type MutationChangeConstituencyInfoArgs = {
  electorate: Scalars['Int'];
  newAdress: Scalars['String'];
  constituencyId: Scalars['Int'];
};


export type MutationUpdateVotersArgs = {
  timeAt: Scalars['Int'];
  voters: Scalars['Int'];
  constituencyId: Scalars['Int'];
};


export type MutationUpdateCardVotersArgs = {
  timeAt: Scalars['Int'];
  cardVoters: Scalars['Int'];
  constituencyId: Scalars['Int'];
};


export type MutationSaveProtocolArgs = {
  finalReport: Scalars['String'];
  constituencyId: Scalars['Int'];
};


export type MutationDeleteProtocolArgs = {
  constituencyId: Scalars['Int'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  errors?: Maybe<Array<FieldError>>;
  preActiveUser?: Maybe<PreActivatedUser>;
};

export type ConstituencyResponse = {
  __typename?: 'ConstituencyResponse';
  errors?: Maybe<Array<FieldError>>;
  error?: Maybe<Scalars['String']>;
  constituency?: Maybe<Constituency>;
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularPreActivatedUserFragment = (
  { __typename?: 'PreActivatedUser' }
  & Pick<PreActivatedUser, 'id' | 'username' | 'phoneNumber' | 'emailAdress' | 'activationCode' | 'firstName' | 'secondName' | 'lastName'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'phoneNumber' | 'emailAdress'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type AssignOperatorMutationVariables = Exact<{
  userId: Scalars['Int'];
  constituencyId: Scalars['Int'];
}>;


export type AssignOperatorMutation = (
  { __typename?: 'Mutation' }
  & { assignOperator: (
    { __typename?: 'ConstituencyResponse' }
    & { constituency?: Maybe<(
      { __typename?: 'Constituency' }
      & Pick<Constituency, 'id' | 'adress'>
    )> }
  ) }
);

export type ChangeConstituencyInfoMutationVariables = Exact<{
  constituencyId: Scalars['Int'];
  newAdress: Scalars['String'];
  electorate: Scalars['Int'];
}>;


export type ChangeConstituencyInfoMutation = (
  { __typename?: 'Mutation' }
  & { changeConstituencyInfo: (
    { __typename?: 'ConstituencyResponse' }
    & { constituency?: Maybe<(
      { __typename?: 'Constituency' }
      & Pick<Constituency, 'id' | 'adress' | 'electorate'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ChangeContactInfoMutationVariables = Exact<{
  phoneNumber?: Maybe<Scalars['String']>;
  emailAdress?: Maybe<Scalars['String']>;
}>;


export type ChangeContactInfoMutation = (
  { __typename?: 'Mutation' }
  & { changeContactInfo: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ChangePasswordWithTokenMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordWithTokenMutation = (
  { __typename?: 'Mutation' }
  & { changePasswordWithToken: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ChangeUserInfoDataMutationVariables = Exact<{
  userType: Scalars['Boolean'];
  id: Scalars['Int'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  secondName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAdress?: Maybe<Scalars['String']>;
}>;


export type ChangeUserInfoDataMutation = (
  { __typename?: 'Mutation' }
  & { changeUserInfoData?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'firstName' | 'secondName' | 'lastName'>
    & RegularUserFragment
  )> }
);

export type ClearAssignedOperatorMutationVariables = Exact<{
  constituencyId: Scalars['Int'];
}>;


export type ClearAssignedOperatorMutation = (
  { __typename?: 'Mutation' }
  & { clearAssignedOperator: (
    { __typename?: 'ConstituencyResponse' }
    & { constituency?: Maybe<(
      { __typename?: 'Constituency' }
      & Pick<Constituency, 'id' | 'adress'>
    )> }
  ) }
);

export type CreateNewConstituencyMutationVariables = Exact<{
  id: Scalars['Int'];
  electorate: Scalars['Int'];
  adress: Scalars['String'];
}>;


export type CreateNewConstituencyMutation = (
  { __typename?: 'Mutation' }
  & { createNewConstituency: (
    { __typename?: 'ConstituencyResponse' }
    & { constituency?: Maybe<(
      { __typename?: 'Constituency' }
      & Pick<Constituency, 'id' | 'adress' | 'electorate' | 'createdAt' | 'updatedAt'>
      & { operator?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'username'>
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type CreateNewUserMutationVariables = Exact<{
  username: Scalars['String'];
  firstName: Scalars['String'];
  secondName?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAdress?: Maybe<Scalars['String']>;
}>;


export type CreateNewUserMutation = (
  { __typename?: 'Mutation' }
  & { createNewUser: (
    { __typename?: 'AdminResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & RegularErrorFragment
    )>>, preActiveUser?: Maybe<(
      { __typename?: 'PreActivatedUser' }
      & RegularPreActivatedUserFragment
    )> }
  ) }
);

export type DeleteConstituencyMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteConstituencyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteConstituency'>
);

export type DeleteProtocolMutationVariables = Exact<{
  constituencyId: Scalars['Int'];
}>;


export type DeleteProtocolMutation = (
  { __typename?: 'Mutation' }
  & { deleteProtocol?: Maybe<(
    { __typename?: 'ConstituencyResponse' }
    & Pick<ConstituencyResponse, 'error'>
    & { constituency?: Maybe<(
      { __typename?: 'Constituency' }
      & Pick<Constituency, 'id'>
    )> }
  )> }
);

export type DeleteUserMutationVariables = Exact<{
  userType: Scalars['Boolean'];
  id: Scalars['Int'];
  username: Scalars['String'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  privilages?: Maybe<Scalars['Boolean']>;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  activationCode: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SaveProtocolMutationVariables = Exact<{
  constituencyId: Scalars['Int'];
  finalReport: Scalars['String'];
}>;


export type SaveProtocolMutation = (
  { __typename?: 'Mutation' }
  & { saveProtocol?: Maybe<(
    { __typename?: 'ConstituencyResponse' }
    & Pick<ConstituencyResponse, 'error'>
    & { constituency?: Maybe<(
      { __typename?: 'Constituency' }
      & Pick<Constituency, 'id' | 'finalReport'>
    )> }
  )> }
);

export type UpdateCardVotersMutationVariables = Exact<{
  constituencyId: Scalars['Int'];
  cardVoters: Scalars['Int'];
  timeAt: Scalars['Int'];
}>;


export type UpdateCardVotersMutation = (
  { __typename?: 'Mutation' }
  & { updateCardVoters?: Maybe<(
    { __typename?: 'ConstituencyResponse' }
    & Pick<ConstituencyResponse, 'error'>
    & { constituency?: Maybe<(
      { __typename?: 'Constituency' }
      & Pick<Constituency, 'id' | 'adress' | 'electorate' | 'votersAt14' | 'votersAt17' | 'cardVotersAt14' | 'cardVotersAt17' | 'createdAt' | 'updatedAt'>
      & { operator?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'username'>
      )> }
    )> }
  )> }
);

export type UpdateVotersMutationVariables = Exact<{
  constituencyId: Scalars['Int'];
  voters: Scalars['Int'];
  timeAt: Scalars['Int'];
}>;


export type UpdateVotersMutation = (
  { __typename?: 'Mutation' }
  & { updateVoters?: Maybe<(
    { __typename?: 'ConstituencyResponse' }
    & Pick<ConstituencyResponse, 'error'>
    & { constituency?: Maybe<(
      { __typename?: 'Constituency' }
      & Pick<Constituency, 'id' | 'adress' | 'electorate' | 'votersAt14' | 'votersAt17' | 'cardVotersAt14' | 'cardVotersAt17' | 'createdAt' | 'updatedAt'>
      & { operator?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'username'>
      )> }
    )> }
  )> }
);

export type GetConstituencyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConstituencyQuery = (
  { __typename?: 'Query' }
  & { getConstituency?: Maybe<Array<(
    { __typename?: 'Constituency' }
    & Pick<Constituency, 'id' | 'adress' | 'electorate' | 'votersAt14' | 'votersAt17' | 'cardVotersAt14' | 'cardVotersAt17' | 'finalReport'>
  )>> }
);

export type GetListOfConstituenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfConstituenciesQuery = (
  { __typename?: 'Query' }
  & { getListOfConstituencies?: Maybe<Array<(
    { __typename?: 'Constituency' }
    & Pick<Constituency, 'id' | 'adress' | 'electorate' | 'votersAt14' | 'votersAt17' | 'cardVotersAt14' | 'cardVotersAt17' | 'finalReport'>
    & { operator?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'firstName' | 'lastName'>
    )> }
  )>> }
);

export type GetListOfUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfUserQuery = (
  { __typename?: 'Query' }
  & { getListOfUser?: Maybe<(
    { __typename?: 'AllUsers' }
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'firstName' | 'secondName' | 'lastName' | 'constituenciesIds'>
      & RegularUserFragment
    )>>, unregisteredUsers?: Maybe<Array<(
      { __typename?: 'PreActivatedUser' }
      & RegularPreActivatedUserFragment
    )>> }
  )> }
);

export type GetReportsQueryVariables = Exact<{
  operatorId?: Maybe<Scalars['Int']>;
}>;


export type GetReportsQuery = (
  { __typename?: 'Query' }
  & { getReports?: Maybe<Array<(
    { __typename?: 'ReportResponse' }
    & Pick<ReportResponse, 'id' | 'adress' | 'report'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const RegularPreActivatedUserFragmentDoc = gql`
    fragment RegularPreActivatedUser on PreActivatedUser {
  id
  username
  phoneNumber
  emailAdress
  activationCode
  firstName
  secondName
  lastName
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  phoneNumber
  emailAdress
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const AssignOperatorDocument = gql`
    mutation AssignOperator($userId: Int!, $constituencyId: Int!) {
  assignOperator(userId: $userId, constituencyId: $constituencyId) {
    constituency {
      id
      adress
    }
  }
}
    `;

export function useAssignOperatorMutation() {
  return Urql.useMutation<AssignOperatorMutation, AssignOperatorMutationVariables>(AssignOperatorDocument);
};
export const ChangeConstituencyInfoDocument = gql`
    mutation ChangeConstituencyInfo($constituencyId: Int!, $newAdress: String!, $electorate: Int!) {
  changeConstituencyInfo(
    constituencyId: $constituencyId
    newAdress: $newAdress
    electorate: $electorate
  ) {
    constituency {
      id
      adress
      electorate
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useChangeConstituencyInfoMutation() {
  return Urql.useMutation<ChangeConstituencyInfoMutation, ChangeConstituencyInfoMutationVariables>(ChangeConstituencyInfoDocument);
};
export const ChangeContactInfoDocument = gql`
    mutation changeContactInfo($phoneNumber: String, $emailAdress: String) {
  changeContactInfo(phoneNumber: $phoneNumber, emailAdress: $emailAdress) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangeContactInfoMutation() {
  return Urql.useMutation<ChangeContactInfoMutation, ChangeContactInfoMutationVariables>(ChangeContactInfoDocument);
};
export const ChangePasswordDocument = gql`
    mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
  changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const ChangePasswordWithTokenDocument = gql`
    mutation ChangePasswordWithToken($token: String!, $newPassword: String!) {
  changePasswordWithToken(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordWithTokenMutation() {
  return Urql.useMutation<ChangePasswordWithTokenMutation, ChangePasswordWithTokenMutationVariables>(ChangePasswordWithTokenDocument);
};
export const ChangeUserInfoDataDocument = gql`
    mutation ChangeUserInfoData($userType: Boolean!, $id: Int!, $username: String!, $firstName: String!, $secondName: String, $lastName: String!, $phoneNumber: String, $emailAdress: String) {
  changeUserInfoData(
    userType: $userType
    id: $id
    username: $username
    firstName: $firstName
    secondName: $secondName
    lastName: $lastName
    phoneNumber: $phoneNumber
    emailAdress: $emailAdress
  ) {
    ...RegularUser
    firstName
    secondName
    lastName
  }
}
    ${RegularUserFragmentDoc}`;

export function useChangeUserInfoDataMutation() {
  return Urql.useMutation<ChangeUserInfoDataMutation, ChangeUserInfoDataMutationVariables>(ChangeUserInfoDataDocument);
};
export const ClearAssignedOperatorDocument = gql`
    mutation ClearAssignedOperator($constituencyId: Int!) {
  clearAssignedOperator(constituencyId: $constituencyId) {
    constituency {
      id
      adress
    }
  }
}
    `;

export function useClearAssignedOperatorMutation() {
  return Urql.useMutation<ClearAssignedOperatorMutation, ClearAssignedOperatorMutationVariables>(ClearAssignedOperatorDocument);
};
export const CreateNewConstituencyDocument = gql`
    mutation CreateNewConstituency($id: Int!, $electorate: Int!, $adress: String!) {
  createNewConstituency(id: $id, electorate: $electorate, adress: $adress) {
    constituency {
      id
      adress
      electorate
      operator {
        username
      }
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useCreateNewConstituencyMutation() {
  return Urql.useMutation<CreateNewConstituencyMutation, CreateNewConstituencyMutationVariables>(CreateNewConstituencyDocument);
};
export const CreateNewUserDocument = gql`
    mutation CreateNewUser($username: String!, $firstName: String!, $secondName: String, $lastName: String!, $phoneNumber: String, $emailAdress: String) {
  createNewUser(
    username: $username
    firstName: $firstName
    secondName: $secondName
    lastName: $lastName
    phoneNumber: $phoneNumber
    emailAdress: $emailAdress
  ) {
    errors {
      ...RegularError
    }
    preActiveUser {
      ...RegularPreActivatedUser
    }
  }
}
    ${RegularErrorFragmentDoc}
${RegularPreActivatedUserFragmentDoc}`;

export function useCreateNewUserMutation() {
  return Urql.useMutation<CreateNewUserMutation, CreateNewUserMutationVariables>(CreateNewUserDocument);
};
export const DeleteConstituencyDocument = gql`
    mutation DeleteConstituency($id: Int!) {
  deleteConstituency(id: $id)
}
    `;

export function useDeleteConstituencyMutation() {
  return Urql.useMutation<DeleteConstituencyMutation, DeleteConstituencyMutationVariables>(DeleteConstituencyDocument);
};
export const DeleteProtocolDocument = gql`
    mutation DeleteProtocol($constituencyId: Int!) {
  deleteProtocol(constituencyId: $constituencyId) {
    constituency {
      id
    }
    error
  }
}
    `;

export function useDeleteProtocolMutation() {
  return Urql.useMutation<DeleteProtocolMutation, DeleteProtocolMutationVariables>(DeleteProtocolDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser($userType: Boolean!, $id: Int!, $username: String!) {
  deleteUser(userType: $userType, id: $id, username: $username)
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!, $privilages: Boolean) {
  login(username: $username, password: $password, privilages: $privilages) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $activationCode: String!, $password: String!) {
  register(
    username: $username
    activationCode: $activationCode
    password: $password
  ) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const SaveProtocolDocument = gql`
    mutation SaveProtocol($constituencyId: Int!, $finalReport: String!) {
  saveProtocol(constituencyId: $constituencyId, finalReport: $finalReport) {
    constituency {
      id
      finalReport
    }
    error
  }
}
    `;

export function useSaveProtocolMutation() {
  return Urql.useMutation<SaveProtocolMutation, SaveProtocolMutationVariables>(SaveProtocolDocument);
};
export const UpdateCardVotersDocument = gql`
    mutation UpdateCardVoters($constituencyId: Int!, $cardVoters: Int!, $timeAt: Int!) {
  updateCardVoters(
    constituencyId: $constituencyId
    cardVoters: $cardVoters
    timeAt: $timeAt
  ) {
    constituency {
      id
      adress
      electorate
      votersAt14
      votersAt17
      cardVotersAt14
      cardVotersAt17
      operator {
        username
      }
      createdAt
      updatedAt
    }
    error
  }
}
    `;

export function useUpdateCardVotersMutation() {
  return Urql.useMutation<UpdateCardVotersMutation, UpdateCardVotersMutationVariables>(UpdateCardVotersDocument);
};
export const UpdateVotersDocument = gql`
    mutation UpdateVoters($constituencyId: Int!, $voters: Int!, $timeAt: Int!) {
  updateVoters(constituencyId: $constituencyId, voters: $voters, timeAt: $timeAt) {
    constituency {
      id
      adress
      electorate
      votersAt14
      votersAt17
      cardVotersAt14
      cardVotersAt17
      operator {
        username
      }
      createdAt
      updatedAt
    }
    error
  }
}
    `;

export function useUpdateVotersMutation() {
  return Urql.useMutation<UpdateVotersMutation, UpdateVotersMutationVariables>(UpdateVotersDocument);
};
export const GetConstituencyDocument = gql`
    query GetConstituency {
  getConstituency {
    id
    adress
    electorate
    votersAt14
    votersAt17
    cardVotersAt14
    cardVotersAt17
    finalReport
  }
}
    `;

export function useGetConstituencyQuery(options: Omit<Urql.UseQueryArgs<GetConstituencyQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetConstituencyQuery>({ query: GetConstituencyDocument, ...options });
};
export const GetListOfConstituenciesDocument = gql`
    query GetListOfConstituencies {
  getListOfConstituencies {
    id
    adress
    electorate
    votersAt14
    votersAt17
    cardVotersAt14
    cardVotersAt17
    finalReport
    operator {
      id
      username
      firstName
      lastName
    }
  }
}
    `;

export function useGetListOfConstituenciesQuery(options: Omit<Urql.UseQueryArgs<GetListOfConstituenciesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetListOfConstituenciesQuery>({ query: GetListOfConstituenciesDocument, ...options });
};
export const GetListOfUserDocument = gql`
    query GetListOfUser {
  getListOfUser {
    users {
      ...RegularUser
      firstName
      secondName
      lastName
      constituenciesIds
    }
    unregisteredUsers {
      ...RegularPreActivatedUser
    }
  }
}
    ${RegularUserFragmentDoc}
${RegularPreActivatedUserFragmentDoc}`;

export function useGetListOfUserQuery(options: Omit<Urql.UseQueryArgs<GetListOfUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetListOfUserQuery>({ query: GetListOfUserDocument, ...options });
};
export const GetReportsDocument = gql`
    query GetReports($operatorId: Int) {
  getReports(operatorId: $operatorId) {
    id
    adress
    report
  }
}
    `;

export function useGetReportsQuery(options: Omit<Urql.UseQueryArgs<GetReportsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetReportsQuery>({ query: GetReportsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};