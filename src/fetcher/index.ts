import { accounts } from "./users/accounts";
import { login } from "./users/login";
import { context, me } from "./users/me";

export const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL;
export const USERS_SERVICE_URL = `${API_GATEWAY_URL}/users-service-api`;

const fetcher = {
  login,
  getMe: me,
  getMeContext: context,
  getAccounts: accounts,
};

export default fetcher;
