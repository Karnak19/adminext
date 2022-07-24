import { useQuery } from 'react-query';

import getToken from '../../app/getToken';
import { useStore } from '../../app/store';
import { getAccounts } from './fetcher';

export const useGetAccountsQuery = () => {
  const role = useStore((state) => state.role);
  const token = getToken();
  const { key, query } = getAccounts();

  return useQuery(key, query, {
    enabled: !!token && role === 'admin',
    staleTime: 10 * 60 * 1000,
  });
};
