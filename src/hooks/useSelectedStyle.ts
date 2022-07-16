import { createStyles } from '@mantine/core';
import { useRouter } from 'next/router';

const useSelectedStyle = createStyles((theme) => ({
  root: {
    borderColor: theme.colors.blue[5],
    borderWidth: 2,
    borderStyle: 'solid',
  },
}));

export const useSelected = (routerQueryKey: string) => {
  const router = useRouter();
  const { classes } = useSelectedStyle();

  const isSelected = (id: string) => {
    return router.query[routerQueryKey] === id;
  };

  return {
    classes,
    isSelected,
  };
};
