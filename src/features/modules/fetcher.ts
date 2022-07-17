import { betterFetch } from '../../app/betterFetch';
import { USERS_SERVICE_URL } from '../../app/constants';
import { Account } from '../account/fetcher';

export interface Module {
  id: string;
  code: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllModules = () => ({
  key: ['modules'],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/modules`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then((response) => response.json() as Promise<Module[]>),
});

export const getAccountModules = (
  accountId: string | undefined,
  accountKey: string | undefined,
) => ({
  key: ['modules', { accountKey, accountId }],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/accounts/${accountId}/modules`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<Module[]>),
});

export const putModules = (
  modulesIds: string[],
  accountId: string | undefined,
  accountKey: string | undefined,
) => ({
  mutation: async () =>
    betterFetch(`${USERS_SERVICE_URL}/accounts/${accountId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
      body: JSON.stringify({ Modules: modulesIds }),
    }).then((response) => response.json() as Promise<Account>),
});
