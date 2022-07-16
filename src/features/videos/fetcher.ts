import { betterFetch } from '../../app/betterFetch';
import { MAIN_API_URL } from '../../app/constants';

export type Video = {
  id: string;
  name: string;
  poster: string | null;
  portraitThumbnail: string | null;
  description: string | null;
  fullDescription: string | null;
  technicalDescription: string | null;
};

export const getVideos = (accountKey?: string) => ({
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

export const getVideoById = (videoId: string, accountKey?: string) => ({
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
