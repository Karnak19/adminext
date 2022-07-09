import { useQuery } from 'react-query';

import fetcher from '../fetcher';
import { useStore } from '../store';

const useCategoriesQuery = () => {
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = fetcher.getCategories(accountKey ?? undefined);

  return useQuery(key, query);
};

export default useCategoriesQuery;
