import { useMutation, useQuery, useQueryClient } from 'react-query';
import { showNotification } from '@mantine/notifications';
import { CircleCheck } from 'tabler-icons-react';

import { useStore } from '../../app/store';
import { getProducts, getProfiles, mutateFanProfiles, mutateProduct } from './fetcher';

export const useGetProfilesQuery = () => {
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = getProfiles(accountKey);

  return useQuery(key, query, {
    enabled: !!accountKey,
  });
};

export const useGetProductsQuery = () => {
  const accountKey = useStore((state) => state.account?.key);

  const { key, query } = getProducts(accountKey);

  return useQuery(key, query, {
    enabled: !!accountKey,
  });
};

export const useMutateFanProfiles = () => {
  const queryClient = useQueryClient();
  const accountId = useStore((state) => state.account?.id);
  const accountKey = useStore((state) => state.account?.key);

  return useMutation(mutateFanProfiles(accountKey, accountId).mutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('fans');
      queryClient.invalidateQueries('fanProducts');

      showNotification({
        message: 'Successfully update fan profiles',
        icon: <CircleCheck />,
        color: 'lime',
      });
    },
  });
};

export const useMutateProducts = () => {
  const queryClient = useQueryClient();
  const accountId = useStore((state) => state.account?.id);
  const accountKey = useStore((state) => state.account?.key);

  return useMutation(mutateProduct(accountKey, accountId).mutation, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
};
