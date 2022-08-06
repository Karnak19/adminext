import { useQuery } from 'react-query';

import { useStore } from '../../app/store';
import { getProfiles } from './fetcher';

export const useGetProfilesQuery = () => {
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = getProfiles(accountKey);

  return useQuery(key, query, {
    enabled: !!accountKey,
  });
};
