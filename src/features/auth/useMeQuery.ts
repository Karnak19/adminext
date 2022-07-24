import { useQuery } from 'react-query';

import getToken from '../../app/getToken';
import { useStore } from '../../app/store';
import { getMe, getMeContext } from './fetcher';

const useMeQuery = () => {
  const token = getToken();
  const _me = getMe();
  const ctx = getMeContext();
  const setRole = useStore((state) => state.setRole);

  const me = useQuery(_me.key, _me.query, {
    enabled: !!token,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });

  const context = useQuery(ctx.key, ctx.query, {
    enabled: !!token,
    retry: false,
    staleTime: 10 * 60 * 1000,
    onSuccess: (data) => {
      const isAdmin = data.Roles.some((role) => role.name === 'manage_customer_accounts');

      return setRole(isAdmin ? 'admin' : 'user', {
        id: data.AccountId,
        name: data.AccountName,
        key: data.accountKey,
      });
    },
  });

  return {
    me,
    context,
  };
};

export default useMeQuery;
