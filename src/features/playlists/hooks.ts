import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

import { useStore } from '../../app/store';
import { getPlaylistById, getPlaylists } from './fetcher';

export const useGetPlaylistsQuery = () => {
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = getPlaylists(accountKey ?? undefined);

  return useQuery(key, query);
};

export const useGetPlaylistByIdQuery = (playlistId?: string) => {
  const router = useRouter();
  const accountKey = useStore((state) => state.account?.key);

  const id = playlistId || (router.query.playlistId as string);

  const { key, query } = getPlaylistById(id, accountKey ?? undefined);

  return useQuery(key, query, {
    enabled: !!id,
  });
};
