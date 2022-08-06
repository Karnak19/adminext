import { betterFetch } from '../../app/betterFetch';
import { USERS_SERVICE_URL } from '../../app/constants';

export const getProfiles = (accountKey: string | undefined) => ({
  key: ['profiles', { accountKey }],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/profiles`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<Profile[]>),
});

export interface Profile {
  id: string;
  name: string;
  description: string | null;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  AccountId: string;
}
