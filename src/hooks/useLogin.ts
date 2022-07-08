import { setCookie } from "cookies-next";
import { useMutation } from "react-query";
import fetcher from "../fetcher";
import { ACCESS_TOKEN_KEY } from "../fetcher/getToken";
import { queryClient } from "../fetcher/queryClient";

const useLogin = () => {
  return useMutation<
    { token: string },
    unknown,
    {
      username: string;
      password: string;
    }
  >((user) => fetcher.login(user.username, user.password).query(), {
    onSuccess: (res) => {
      setCookie(ACCESS_TOKEN_KEY, res.token);
      queryClient.fetchQuery(["me"]);
      queryClient.fetchQuery(["context"]);
      console.log(res);
    },
  });
};

export default useLogin;
