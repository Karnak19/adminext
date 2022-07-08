import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { fetcher } from "../../../src/fetcher";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          required: true,
          placeholder: "Origins Digital",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials, req) => {
        const res = await fetcher
          .login(credentials.username, credentials.password)
          .query();
        return res;
      },
    }),
  ],
});
