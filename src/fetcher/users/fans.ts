import { USERS_SERVICE_URL } from '..';
import { betterFetch } from '../betterFetch';

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

export const fans = (accountKey: string | undefined) => ({
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
