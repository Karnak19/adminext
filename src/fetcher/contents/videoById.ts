import { MAIN_API_URL } from '..';
import { betterFetch } from '../betterFetch';
import { Video } from './videos';

export const videoById = (videoId: string, accountKey?: string) => ({
  key: ['video', { videoId, accountKey }],
  query: async () =>
    betterFetch(`${MAIN_API_URL}/videos/${videoId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<Video>),
});
