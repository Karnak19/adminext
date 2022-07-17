import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { showNotification } from '@mantine/notifications';
import { CircleCheck } from 'tabler-icons-react';

import { useStore } from '../../app/store';
import { getAccountModules, getAllModules, putModules } from './fetcher';

export const useGetAccountModulesQuery = () => {
  const accountId = useStore((state) => state.account?.id);
  const accountKey = useStore((state) => state.account?.key);

  const mod = getAccountModules(accountId, accountKey);
  return useQuery(mod.key, mod.query, {
    enabled: !!accountId,
  });
};

export const useGetAllModulesQuery = () => {
  const mod = getAllModules();
  return useQuery(mod.key, mod.query, {
    enabled: true,
  });
};

export const useMutateAccountModules = (modules: string[]) => {
  const accountId = useStore((state) => state.account?.id);
  const accountKey = useStore((state) => state.account?.key);
  const queryClient = useQueryClient();

  return useMutation(putModules(modules, accountId, accountKey).mutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('modules');
      showNotification({
        message: 'Added new modules successfully',
        icon: <CircleCheck />,
        color: 'lime',
      });
    },
  });
};

export const useGetModulesCombinedQuery = () => {
  const [newModules, setNewModules] = useState<string[]>([]);
  const account = useGetAccountModulesQuery();
  const all = useGetAllModulesQuery();

  useEffect(() => {
    if (account.data) {
      setNewModules(account.data.map((m) => m.id));
    }
  }, [account.data]);

  const mutation = useMutateAccountModules(newModules);

  return {
    account,
    all,
    setNewModules,
    mutation,
    newModules,
  };
};
