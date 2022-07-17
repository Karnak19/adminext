import { betterFetch } from '../../app/betterFetch';
import { MAIN_API_URL } from '../../app/constants';

export const getCategories = (accountKey?: string) => ({
  key: ['categories', { accountKey }],
  query: async () =>
    betterFetch(`${MAIN_API_URL}/back-office/categories`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<Category[]>),
});

export const getCategoryById = (categoryId: string, accountKey?: string) => ({
  key: ['categories', { categoryId, accountKey }],
  query: async () =>
    betterFetch(`${MAIN_API_URL}/back-office/categories/${categoryId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<Category>),
});

export interface Platform {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

export interface Meta {
  platform: Platform;
}

export interface VideoCategory {
  VideoId: string;
  CategoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Video {
  id: string;
  name: string;
  filename: string;
  description: string;
  duration: number;
  poster: string;
  portraitThumbnail?: unknown;
  url: string;
  visibility: string;
  captions?: unknown;
  status: string;
  archiveData?: unknown;
  vendorName: string;
  vendorVideoId?: unknown;
  vendorApiKey?: unknown;
  meta: Meta;
  AccountId: string;
  publicationDate: Date;
  fullDescription: string;
  technicalDescription?: unknown;
  PlaylistId: string;
  playlistRank?: number;
  liveSource: boolean;
  urlMp4?: unknown;
  createdAt: Date;
  updatedAt: Date;
  VideoCategory: VideoCategory;
}

export interface Platform2 {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

export interface Meta2 {
  platform: Platform2;
}

export interface Video2 {
  id: string;
  name: string;
  filename: string;
  description: string;
  duration: number;
  poster: string;
  portraitThumbnail?: unknown;
  url: string;
  visibility: string;
  captions?: unknown;
  status: string;
  archiveData?: unknown;
  vendorName: string;
  vendorVideoId?: unknown;
  vendorApiKey?: unknown;
  meta: Meta2;
  AccountId: string;
  publicationDate: Date;
  fullDescription?: unknown;
  technicalDescription?: unknown;
  PlaylistId: string;
  playlistRank: number;
  liveSource: boolean;
  urlMp4?: unknown;
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
  portraitThumbnail: string | null;
  createdAt: Date;
  updatedAt: Date;
  Videos: Video2[];
}

export interface Category {
  id: string;
  name: string;
  accountId: string;
  description: string | null;
  thumbnail: string;
  portraitThumbnail: string | null;
  createdAt: Date;
  updatedAt: Date;
  Videos: Video[];
  Playlists: Playlist[];
  Events: unknown[];
  SubCategories: unknown[];
}
