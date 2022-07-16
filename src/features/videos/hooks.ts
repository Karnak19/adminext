import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { useStore } from '../../app/store';
import { getVideoById, getVideos } from './fetcher';

export const useGetVideoByIdQuery = (videoId?: string) => {
  const router = useRouter();
  const accountKey = useStore((state) => state.account?.key);

  const id = videoId || (router.query.videoId as string);

  const { key, query } = getVideoById(id, accountKey ?? undefined);

  return useQuery(key, query, {
    enabled: !!id,
  });
};

export const useGetVideosQuery = (enabled = true) => {
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = getVideos(accountKey ?? undefined);

  return useQuery(key, query, {
    enabled,
  });
};
