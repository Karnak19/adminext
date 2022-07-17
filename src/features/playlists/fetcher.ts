import { betterFetch } from '../../app/betterFetch';
import { MAIN_API_URL } from '../../app/constants';

export const getPlaylists = (accountKey?: string) => ({
  key: ['playlists', { accountKey }],
  query: async () =>
    betterFetch(`${MAIN_API_URL}/back-office/playlists`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<Playlist[]>),
});

export const getPlaylistById = (playlistId: string, accountKey?: string) => ({
  key: ['playlists', { playlistId, accountKey }],
  query: async () =>
    betterFetch(`${MAIN_API_URL}/back-office/playlists/${playlistId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<PlaylistWithVideo>),
});

interface ArchiveData {
  jobId: string;
  percent: number;
}

interface Platform {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

interface Meta {
  platform: Platform;
}

interface Video {
  id: string;
  name: string;
  filename: string;
  description: string;
  duration: number;
  poster: string;
  portraitThumbnail: string;
  url: string;
  visibility: string;
  captions?: any;
  status: string;
  archiveData: ArchiveData;
  vendorName: string;
  vendorVideoId?: any;
  vendorApiKey?: any;
  meta: Meta;
  AccountId: string;
  publicationDate: Date;
  fullDescription: string;
  technicalDescription?: any;
  PlaylistId: string;
  playlistRank: number;
  liveSource: boolean;
  urlMp4?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Playlist {
  id: string;
  name: string;
  accountId: string;
  CategoryId: string;
  description: string;
  thumbnail: string;
  portraitThumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PlaylistWithVideo = Playlist & {
  Videos: Video[];
};
