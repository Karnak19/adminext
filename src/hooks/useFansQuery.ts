import { useQuery } from 'react-query';

import fetcher from '../fetcher';
import { useStore } from '../store';

const useFansQuery = () => {
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = fetcher.getFans(accountKey);

  return useQuery(key, query, {
    enabled: !!accountKey,
  });
};

export default useFansQuery;
