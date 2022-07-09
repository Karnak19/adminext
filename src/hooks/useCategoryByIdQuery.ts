import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import fetcher from '../fetcher';
import { useStore } from '../store';

const useCategoryByIdQuery = (categoryId?: string) => {
  const router = useRouter();
  const accountKey = useStore((state) => state.account?.key);

  const id = categoryId || (router.query.categoryId as string);

  const { key, query } = fetcher.getCategoryById(id, accountKey ?? undefined);

  return useQuery(key, query, {
    enabled: !!id,
  });
};

export default useCategoryByIdQuery;
