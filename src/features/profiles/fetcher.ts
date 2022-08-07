import { betterFetch } from '../../app/betterFetch';
import { USERS_SERVICE_URL } from '../../app/constants';
import { FanWithProfiles } from '../fans/fetcher';

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

export const mutateFanProfiles = (
  accountKey: string | undefined,
  accountId: string | undefined,
) => ({
  mutation: async (values: { fanId: string; profiles: string[] }) =>
    betterFetch(`${USERS_SERVICE_URL}/fans/${values.fanId}/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
      body: JSON.stringify({ accountId, Profiles: values.profiles }),
    }).then((res) => res.json() as Promise<FanWithProfiles>),
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
