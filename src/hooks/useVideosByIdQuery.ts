import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import fetcher from '../fetcher';
import { useStore } from '../store';

const useVideoByIdQuery = (videoId?: string) => {
  const router = useRouter();
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = fetcher.getVideoById(
    videoId || (router.query.id as string),
    accountKey ?? undefined,
  );

  return useQuery(key, query);
};

export default useVideoByIdQuery;
