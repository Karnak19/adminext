import { useQuery } from "react-query";
import fetcher from "../fetcher";
import getToken from "../fetcher/getToken";

const useAccountsQuery = () => {
  const token = getToken();
  const { key, query } = fetcher.getAccounts();

  return useQuery(key, query, {
    enabled: !!token,
    staleTime: 10 * 60 * 1000,
  });
};

export default useAccountsQuery;
