import { useQuery } from 'react-query';

import getToken from '../../app/getToken';
import { getMe, getMeContext } from './fetcher';

const useMeQuery = () => {
  const token = getToken();
  const _me = getMe();
  const ctx = getMeContext();

  const me = useQuery(_me.key, _me.query, {
    enabled: !!token,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });

  const context = useQuery(ctx.key, ctx.query, {
    enabled: !!token,
    retry: false,
    staleTime: 10 * 60 * 1000,
  });

  return {
    me,
    context,
  };
};

export default useMeQuery;
