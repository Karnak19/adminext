import React from 'react';
import { createStyles, Group, Paper, Text } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  value: {
    color: theme.colors.blue[0],
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },
  root: {
    cursor: 'pointer',
    transition: 'ease 100ms',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[7] : theme.colors.blue[5],
    ':hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[9] : theme.colors.blue[7],
    },
  },

  title: {
    color: theme.colors.blue[0],
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

function Stat({
  icon,
  title,
  value,
  path,
}: {
  title: string;
  icon: JSX.Element;
  value: number;
  path: string;
}) {
  const { classes } = useStyles();

  return (
    <Link href={path}>
      <Paper withBorder p="md" radius="md" key={title} className={classes.root}>
        <Group position="apart">
          <>
            <Text size="xs" className={classes.title}>
              {title}
            </Text>
            {icon}
          </>
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>
            {value} {title}
          </Text>
        </Group>
      </Paper>
    </Link>
  );
}

export default Stat;
