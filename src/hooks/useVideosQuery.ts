import { useQuery } from 'react-query';

import fetcher from '../fetcher';
import { useStore } from '../store';

const useVideosQuery = (enabled = true) => {
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = fetcher.getVideos(accountKey ?? undefined);

  return useQuery(key, query, {
    enabled,
  });
};

export default useVideosQuery;
