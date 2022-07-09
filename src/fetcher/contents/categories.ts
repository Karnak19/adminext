import { MAIN_API_URL } from '..';
import { betterFetch } from '../betterFetch';
import { Category } from './categoryById';

export const categories = (accountKey?: string) => ({
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
