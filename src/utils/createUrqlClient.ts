import { dedupExchange, fetchExchange, Exchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import { LoginMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';
import { pipe, tap } from 'wonka';
import Router from 'next/router';
import gql from 'graphql-tag';
import { betterUpdateQuery } from './betterUpdateQuery';
import { isServer } from './isServer';

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error) {
        if (error.message.includes('not authenticated')) {
          Router.replace('/');
        }
      }
    })
  );
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = '';

  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: { credentials: 'include' as const, headers: cookie ? { cookie } : undefined },
    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              });
            },
            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(cache, { query: MeDocument }, _result, (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              });
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(cache, { query: MeDocument }, _result, () => ({ me: null }));
            },
            createNewUser: (_result, args, cache, info) => {
              cache.invalidate('Query', 'getListOfUser' || {});
            },
            createNewConstituency: (_result, args, cache, info) => {
              cache.invalidate('Query', 'getListOfConstituencies' || {});
            },
            changeUserInfoData: (_result, args, cache, info) => {
              cache.invalidate('Query', 'getListOfUser' || {});
            },
            deleteUser: (_result, args, cache, info) => {
              cache.invalidate('Query', 'getListOfUser' || {});
              cache.invalidate('Query', 'getListOfConstituencies' || {});
            },
            deleteConstituency: (_result, args, cache, info) => {
              cache.invalidate('Query', 'getListOfConstituencies' || {});
              cache.invalidate('Query', 'getListOfUser' || {});
            },
            assignOperator: (_result, args, cache, info) => {
              cache.invalidate('Query', 'getListOfConstituencies' || {});
              cache.invalidate('Query', 'getListOfUser' || {});
            },
            clearAssignedOperator: (_result, args, cache, info) => {
              cache.invalidate('Query', 'getListOfConstituencies' || {});
              cache.invalidate('Query', 'getListOfUser' || {});
            },
            changeConstituencyInfo: (_result, args, cache, info) => {
              cache.invalidate('Query', 'getListOfConstituencies' || {});
            },
            saveProtocol: (_result: any, args, cache: any, info) => {
              const { constituencyId, finalReport } = args as any;
              const data = cache.readFragment(
                gql`
                  fragment _ on Constituency {
                    id
                    finalReport
                  }
                `,
                { id: constituencyId } as any
              );

              if (data) {
                cache.writeFragment(
                  gql`
                    fragment _ on Constituency {
                      id
                      finalReport
                    }
                  `,
                  { id: constituencyId, finalReport } as any
                );
              }
            },
            deleteProtocol: (_result, args, cache, info) => {
              const { constituencyId } = args as any;
              const data = cache.readFragment(
                gql`
                  fragment _ on Constituency {
                    id
                    finalReport
                  }
                `,
                { id: constituencyId } as any
              );

              if (data) {
                cache.writeFragment(
                  gql`
                    fragment _ on Constituency {
                      id
                      finalReport
                    }
                  `,
                  { id: constituencyId, finalReport: '' } as any
                );
              }
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
