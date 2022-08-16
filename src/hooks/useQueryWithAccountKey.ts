import { QueryFunction, QueryKey, useQuery, UseQueryOptions } from 'react-query';

import { useStore } from '../app/store';

function useQueryWithAccountKey<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  key: TQueryKey,
  query: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
) {
  const accountKey = useStore((state) => state.account?.key);

  return useQuery(key, query, {
    ...options,
    enabled: !!accountKey,
  });
}

export default useQueryWithAccountKey;
