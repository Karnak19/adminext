import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { useStore } from '../../app/store';
import { getCategories, getCategoryById } from './fetcher';

export const useGetCategoriesQuery = () => {
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = getCategories(accountKey ?? undefined);

  return useQuery(key, query);
};

export const useGetCategoryByIdQuery = (categoryId?: string) => {
  const router = useRouter();
  const accountKey = useStore((state) => state.account?.key);

  const id = categoryId || (router.query.categoryId as string);

  const { key, query } = getCategoryById(id, accountKey ?? undefined);

  return useQuery(key, query, {
    enabled: !!id,
  });
};
