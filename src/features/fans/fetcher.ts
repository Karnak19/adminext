import { betterFetch } from '../../app/betterFetch';
import { USERS_SERVICE_URL } from '../../app/constants';
import { Profile } from '../profiles/fetcher';

interface Sso {
  providerId: string;
}

interface Meta {
  sso: Sso;
  population: unknown;
}

export interface Fan {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  gender: string;
  country: string | null;
  birthYear: string | null;
  birthdate: string;
  address: string;
  phone: string | null;
  imageUrl: string;
  status: string;
  password: string;
  preferredLanguage: string | null;
  deleteAt: string | null;
  abortToken: string | null;
  meta: Meta;
  createdAt: Date;
  updatedAt: Date;
  AccountId: string;
}

export interface FanWithProfiles extends Fan {
  Profiles: Profile[];
}

export const getFans = (accountKey: string | undefined) => ({
  key: ['fans', { accountKey }],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/fans`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<Fan[]>),
});

export const getFanById = (fanId: string, accountKey: string | undefined) => ({
  key: ['fans', { accountKey, fanId }],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/fans/${fanId}?expand=[Profile]`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<FanWithProfiles>),
});
