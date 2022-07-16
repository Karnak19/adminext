import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { useStore } from '../../app/store';
import { getFanById, getFans } from './fetcher';

export const useGetFanByIdQuery = () => {
  const router = useRouter();
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = getFanById(router.query.fanId as string, accountKey);

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
