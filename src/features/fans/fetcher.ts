import { betterFetch } from '../../app/betterFetch';
import { PAYMENT_SERVICE_URL, USERS_SERVICE_URL } from '../../app/constants';
import { Profile } from '../profilesAndProducts/fetcher';

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

interface Subscription {
  periodStartDate: number;
  canceled: boolean;
  subscriptionId: string;
  startDate: number;
  periodEndDate: number;
  status: string;
}

interface Data {
  paymentOfferName: string;
  subscription: Subscription;
  productName: string;
  fanUsername: string;
  paymentType: string;
}

export interface FanProduct {
  entityType: string;
  accountId: string;
  fanId: string;
  productId: string;
  provider: string;
  paymentOfferId: string;
  status: string;
  data: Data;
  _type: string;
  created: Date;
  updated: Date;
}

interface FanProductsResponse {
  items: FanProduct[];
  cursor: {
    before: string;
    after: string;
  };
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

export const getFanProducts = (fanId: string, accountKey: string | undefined) => ({
  //https://dev-api-gateway.onrewind.tv/payment-service-api/back-office/fans/b0f2e061-9b3c-4b12-bfe9-0d270142108a/products
  key: ['fanProducts', { accountKey, fanId }],
  query: async () =>
    betterFetch(`${PAYMENT_SERVICE_URL}/back-office/fans/${fanId}/products`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-account-key': accountKey || '',
      },
    }).then((response) => response.json() as Promise<FanProductsResponse>),
});
