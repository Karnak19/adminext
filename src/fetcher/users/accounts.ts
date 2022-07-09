import { USERS_SERVICE_URL } from '..';
import { betterFetch } from '../betterFetch';

export type Account = {
  id: string;
  name: string;
  key: string;
};

export const accounts = () => ({
  key: ['accounts'],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/accounts`).then(
      (response) => response.json() as Promise<Account[]>,
    ),
});
