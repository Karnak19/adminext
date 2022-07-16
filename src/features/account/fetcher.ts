import { betterFetch } from '../../app/betterFetch';
import { USERS_SERVICE_URL } from '../../app/constants';

export type Account = {
  id: string;
  name: string;
  key: string;
};

export const getAccounts = () => ({
  key: ['accounts'],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/accounts`).then(
      (response) => response.json() as Promise<Account[]>,
    ),
});
