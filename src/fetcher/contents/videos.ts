import { MAIN_API_URL } from '..';
import { betterFetch } from '../betterFetch';

export type Video = {
  id: string;
  name: string;
  poster: string | null;
  portraitThumbnail: string | null;
};

export const videos = (accountKey?: string) => ({
  key: ['videos', { accountKey }],
  query: async () =>
    betterFetch(`${MAIN_API_URL}/videos`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<Video[]>),
});
