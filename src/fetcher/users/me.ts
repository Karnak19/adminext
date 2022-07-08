import { USERS_SERVICE_URL } from "..";
import { betterFetch } from "../betterFetch";

export const me = () => ({
  key: ["me"],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/users/me`).then((response) =>
      response.json()
    ),
});

export const context = () => ({
  key: ["context"],
  query: async () =>
    betterFetch(`${USERS_SERVICE_URL}/users/me/context`).then((response) =>
      response.json()
    ),
});
