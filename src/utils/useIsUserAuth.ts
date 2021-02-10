import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMeQuery } from '../generated/graphql';

export const useIsUserAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace('/');
    }
  }, [fetching, data, router]);

  return !!(data?.me?.username && data?.me?.username !== 'Admin');
};

export const useIsAdminAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace('/admin');
    }
  }, [fetching, data, router]);

  return data?.me?.username === 'Admin';
};
