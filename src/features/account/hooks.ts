import { useQuery } from 'react-query';

import getToken from '../../app/getToken';
import { getAccounts } from './fetcher';

export const useGetAccountsQuery = () => {
  const token = getToken();
  const { key, query } = getAccounts();

  return useQuery(key, query, {
    enabled: !!token,
    staleTime: 10 * 60 * 1000,
  });
};
