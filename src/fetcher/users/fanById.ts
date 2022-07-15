import { USERS_SERVICE_URL } from '..';
import { betterFetch } from '../betterFetch';
import { Fan } from './fans';

export const fanById = (fanId: string, accountKey: string | undefined) => ({
  key: ['fans', { accountKey, fanId }],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/fans/${fanId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<Fan[]>),
});
