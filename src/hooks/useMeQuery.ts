import { useQuery } from "react-query";
import fetcher from "../fetcher";
import getToken from "../fetcher/getToken";

const useMeQuery = () => {
  const token = getToken();
  const getMe = fetcher.getMe();
  const getContext = fetcher.getMeContext();

  const me = useQuery(getMe.key, getMe.query, {
    enabled: !!token,
    staleTime: 10 * 60 * 1000,
  });

  const context = useQuery(getContext.key, getContext.query, {
    enabled: !!token,
    staleTime: 10 * 60 * 1000,
  });

  return {
    me,
    context,
  };
};

export default useMeQuery;
