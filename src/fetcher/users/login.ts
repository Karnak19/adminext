import { USERS_SERVICE_URL } from '..';
import { betterFetch } from '../betterFetch';

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
