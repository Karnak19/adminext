import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import fetcher from '../fetcher';
import { useStore } from '../store';

const useFanByIdQuery = () => {
  const router = useRouter();
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = fetcher.getFanById(router.query.fanId as string, accountKey);

  return useQuery(key, query, {
    enabled: !!accountKey,
  });
};

export default useFanByIdQuery;
