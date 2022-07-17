import { useMutation, useQuery, useQueryClient } from 'react-query';
import { showNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { CircleCheck } from 'tabler-icons-react';

import { useStore } from '../../app/store';
import { getVideoById, getVideos, updateVideo } from './fetcher';

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

export const useMutateVideo = (videoId?: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const accountKey = useStore((state) => state.account?.key);

  const id = videoId || (router.query.videoId as string);

  const { mutation } = updateVideo(id, accountKey ?? undefined);

  return useMutation(mutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('videos');
      queryClient.invalidateQueries('categories');
      queryClient.invalidateQueries('playlists');

      showNotification({
        message: 'Video updated successfully',
        icon: <CircleCheck />,
        color: 'lime',
      });
    },
  });
};
