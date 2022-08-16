import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { useStore } from '../../app/store';
import { getFanById, getFanProducts, getFans } from './fetcher';

export const useGetFanByIdQuery = (id?: string) => {
  const router = useRouter();
  const accountKey = useStore((state) => state.account?.key);

  const _id = id || router.query.fanId;

  const { key, query } = getFanById(_id as string, accountKey);

  return useQuery(key, query, {
    enabled: !!accountKey,
  });
};

export const useGetFanProductsQuery = (id?: string) => {
  const router = useRouter();
  const accountKey = useStore((state) => state.account?.key);

  const _id = id || router.query.fanId;

  const { key, query } = getFanProducts(_id as string, accountKey);

  return useQuery(key, query, {
    enabled: !!accountKey,
  });
};

export const useGetFansQuery = () => {
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = getFans(accountKey);

  return useQuery(key, query, {
    enabled: !!accountKey,
  });
};
