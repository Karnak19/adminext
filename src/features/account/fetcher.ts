import { betterFetch } from '../../app/betterFetch';
import { USERS_SERVICE_URL } from '../../app/constants';

export const getAccounts = () => ({
  key: ['accounts'],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/accounts`).then(
      (response) => response.json() as Promise<Account[]>,
    ),
});

interface Vendor {
  name: string;
}

interface ServiceAccount {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

interface Firebase {
  deleteExpirationDays: number;
  serviceAccount: ServiceAccount;
}

interface Oauth {
  vendor: Vendor;
  firebase: Firebase;
}

interface Cms {
  projectId: string;
  primaryApiKey: string;
  secondaryApiKey: string;
  provider: string;
  managementApiKey: string;
}

interface Calendar {
  id: string;
  key: string;
}

interface Opta {
  user: string;
  password: string;
}

interface Languages {
  available: string[];
  default: string;
}

interface Meta {
  email: string;
  oauth: Oauth;
  cms: Cms;
  corpName: string;
  address: string;
  SIRET: string;
  phone: string;
  website: string;
  type: string;
  timezone: string;
  hashtag: string;
  gaAccountId: string;
  cmsAccountId: string;
  calendar: Calendar;
  opta: Opta;
  nbAllowedSessions: number;
  languages: Languages;
}

interface Stripe {
  accountId: string;
  publishableKey: string;
  secretKey: string;
  webhookSecret: string;
}

interface PaymentConfig {
  stripe: Stripe;
}

interface AccountsGroups {
  createdAt: Date;
  updatedAt: Date;
  AccountId: string;
  GroupId: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  accessLevel: number;
  createdAt: Date;
  updatedAt: Date;
  Accounts_Groups: AccountsGroups;
}

interface AccountsModules {
  createdAt: Date;
  updatedAt: Date;
  AccountId: string;
  ModuleId: string;
}

interface Module {
  id: string;
  code: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  Accounts_Modules: AccountsModules;
}

export interface Account {
  id: string;
  key: string;
  name: string;
  description: string | null;
  meta: Meta;
  paymentConfig: PaymentConfig;
  SportId: string;
  cachingData?: unknown;
  createdAt: Date;
  updatedAt: Date;
  Groups: Group[];
  Modules: Module[];
}
