import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { useStore } from '../../app/store';
import { getFanById, getFanProducts, getFans } from './fetcher';

export const useGetFanByIdQuery = (id?: string, enabled?: boolean) => {
  const router = useRouter();
  const accountKey = useStore((state) => state.account?.key);

  const _id = id || router.query.fanId;

  const { key, query } = getFanById(_id as string, accountKey);

  return useQuery(key, query, {
    enabled: !!accountKey && enabled,
  });
};

export const useGetFanProductsQuery = (id?: string, enabled?: boolean) => {
  const router = useRouter();
  const accountKey = useStore((state) => state.account?.key);

  const _id = id || router.query.fanId;

  const { key, query } = getFanProducts(_id as string, accountKey);

  return useQuery(key, query, {
    enabled: !!accountKey && enabled,
  });
};

export const useGetFansQuery = () => {
  const accountKey = useStore((state) => state.account?.key);

  const { ref, inView } = useInView();

  const { key, query } = getFans(accountKey);

  const _query = useInfiniteQuery(key, query, {
    enabled: !!accountKey,
    getNextPageParam: (prevPage) => prevPage.cursor.after,
  });

  useEffect(() => {
    if (inView) {
      _query.fetchNextPage();
    }
  }, [inView, _query.isFetchingNextPage]);

  return {
    ..._query,
    ref,
  };
};
