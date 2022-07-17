import React from 'react';
import { Checkbox, createStyles, Text, UnstyledButton } from '@mantine/core';

const useStyles = createStyles(
  (theme, { checked, isNew }: { checked: boolean; isNew: boolean }) => ({
    button: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      transition: 'background-color 150ms ease, border-color 150ms ease',
      border: `1px solid ${
        checked
          ? isNew
            ? theme.colors.lime[theme.colorScheme === 'dark' ? 9 : 6]
            : theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 9 : 6]
          : theme.colorScheme === 'dark'
          ? theme.colors.dark[8]
          : theme.colors.gray[3]
      }`,
      borderRadius: theme.radius.sm,
      padding: theme.spacing.sm,
      backgroundColor: checked
        ? theme.colorScheme === 'dark'
          ? theme.fn.rgba(isNew ? theme.colors.lime[8] : theme.colors[theme.primaryColor][8], 0.3)
          : isNew
          ? theme.colors.lime[0]
          : theme.colors[theme.primaryColor][0]
        : theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.white,
    },

    body: {
      flex: 1,
      marginLeft: theme.spacing.md,
    },
  }),
);

interface ImageCheckboxProps {
  checked: boolean;
  handleChange: (id: string) => void;
  title: string;
  id: string;
  isNew: boolean;
}

type IProps = ImageCheckboxProps;
function ModuleChecker({ checked, title, id, handleChange, isNew }: IProps) {
  const { classes } = useStyles({ checked, isNew });

  return (
    <UnstyledButton onClick={() => handleChange(id)} className={classes.button}>
      <div className={classes.body}>
        <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
          {title.replace('_', ' ')}
        </Text>
      </div>

      <Checkbox
        checked={checked}
        tabIndex={-1}
        color={isNew ? 'lime' : 'blue'}
        styles={{ input: { cursor: 'pointer' } }}
      />
    </UnstyledButton>
  );
}

export default ModuleChecker;
