import { useState } from 'react';
import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    zIndex: 1,
  },
  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export const useStickyHeader = (_scrolled = false) => {
  const [scrolled, setScrolled] = useState(_scrolled);
  const style = useStyles();

  return { scrolled, setScrolled, ...style };
};
