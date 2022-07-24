import { betterFetch } from '../../app/betterFetch';
import { USERS_SERVICE_URL } from '../../app/constants';

export const login = (username: string, password: string) => ({
  query: async () => {
    const auth = await betterFetch(`${USERS_SERVICE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => response.json());

    const data = {
      token: auth.accessToken,
    };

    return data;
  },
});

export const getMe = () => ({
  key: ['me'],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/users/me`).then((response) => response.json()),
});

export const getMeContext = () => ({
  key: ['context'],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/users/me/context`).then(
      (response) => response.json() as Promise<Context>,
    ),
});

interface GroupsUsers {
  createdAt: Date;
  updatedAt: Date;
  UserId: string;
  GroupId: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  lastName: string | null;
  firstName: string;
  phone: string | null;
  type: string;
  password: string;
  resetPasswordToken: string | null;
  confirmationToken: string | null;
  meta: unknown;
  oauth: unknown;
  createdAt: Date;
  updatedAt: Date;
  Groups_Users: GroupsUsers;
}

interface Group {
  id: string;
  name: string;
  description: string | null;
  accessLevel: number;
  createdAt: Date;
  updatedAt: Date;
  Users: User[];
}

interface GroupsRole {
  createdAt: Date;
  updatedAt: Date;
  RoleId: string;
  GroupId: string;
}

interface Group2 {
  id: string;
  name: string;
  description: string | null;
  accessLevel: number;
  createdAt: Date;
  updatedAt: Date;
  Groups_Role: GroupsRole;
}

interface Role {
  id: string;
  name: string;
  description: string | null;
  accessLevel: number;
  createdAt: Date;
  updatedAt: Date;
  Groups: Group2[];
}

interface Languages {
  available: string[];
  default: string;
}

interface Meta {
  languages: Languages;
  matomoId: string;
}

interface PaymentConfig {
  defaultPaymentOffers: unknown[];
}

interface AccountsModules {
  createdAt: Date;
  updatedAt: Date;
  AccountId: string;
  ModuleId: string;
}

interface Account {
  id: string;
  key: string;
  name: string;
  description: string | null;
  meta: Meta;
  paymentConfig: PaymentConfig;
  SportId: string | null;
  cachingData: unknown;
  createdAt: Date;
  updatedAt: Date;
  Accounts_Modules: AccountsModules;
}

interface Module {
  id: string;
  code: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  Accounts: Account[];
}

interface Languages2 {
  available: string[];
  default: string;
}

export interface Context {
  id: string;
  username: string;
  email: string;
  lastName: string | null;
  firstName: string;
  phone: string | null;
  type: string;
  password: string;
  resetPasswordToken: string | null;
  confirmationToken: string | null;
  meta: unknown;
  oauth: unknown;
  createdAt: Date;
  updatedAt: Date;
  Groups: Group[];
  Roles: Role[];
  AccountId: string;
  AccountName: string;
  cms: unknown;
  SportId: string | null;
  accountKey: string;
  Modules: Module[];
  accessLevel: number;
  unrestrictedAccess: boolean;
  languages: Languages2;
}
