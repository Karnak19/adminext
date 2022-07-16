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
    betterFetch(`${USERS_SERVICE_URL}/users/me/context`).then((response) => response.json()),
});
