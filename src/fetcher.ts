import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30,
    },
  },
});

const login = (username: string, password: string) => ({
  key: ["login", username],
  query: async () => {
   return {
      username,
      jwt: "asdfasfadsfasdfsdafasdfasdfasdfsdfs",
   }
  },
});

export const fetcher = {
  login,
};
