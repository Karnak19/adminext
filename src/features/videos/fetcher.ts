import { betterFetch } from '../../app/betterFetch';
import { MAIN_API_URL } from '../../app/constants';

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
  key: ['videos', { videoId, accountKey }],
  query: async () =>
    betterFetch(`${MAIN_API_URL}/videos/${videoId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<Video>),
});

export const updateVideo = (videoId: string, accountKey?: string) => ({
  mutation: async (video: Partial<Video>) =>
    betterFetch(`${MAIN_API_URL}/videos/${videoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
      body: JSON.stringify(video),
    }).then((response) => response.json() as Promise<Video>),
});

export interface ArchiveData {
  jobId: string;
  percent: number;
}

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

export interface Category {
  id: string;
  name: string;
  accountId: string;
  description: string;
  thumbnail: string;
  portraitThumbnail?: any;
  createdAt: Date;
  updatedAt: Date;
  VideoCategory: VideoCategory;
}

export interface SubCategory {
  id: string;
  name: string;
  accountId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoCategorySubCategory {
  id: string;
  CategoryId: string;
  SubCategoryId: string;
  VideoId: string;
  createdAt: Date;
  updatedAt: Date;
  SubCategory: SubCategory;
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

export interface Video {
  id: string;
  name: string;
  filename: string;
  description: string | null;
  duration: number;
  poster: string;
  portraitThumbnail: string | null;
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
  fullDescription: string | null;
  technicalDescription: string | null;
  PlaylistId: string;
  playlistRank: number;
  liveSource: boolean;
  urlMp4: string | null;
  createdAt: Date;
  updatedAt: Date;
  Event?: any;
  Tags: unknown[];
  Categories: Category[];
  VideoCategorySubCategories: VideoCategorySubCategory[];
  Playlist: Playlist;
  ItemProducts: unknown[];
  PaymentOffers: unknown[];
}
