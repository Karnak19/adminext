import { useQuery } from 'react-query';

import fetcher from '../fetcher';
import { useStore } from '../store';

const useVideosQuery = () => {
  const accountKey = useStore((state) => state.accountKey);

  const { key, query } = fetcher.getVideos(accountKey ?? undefined);

  return useQuery(key, query);
};

export default useVideosQuery;
