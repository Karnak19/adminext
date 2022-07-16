import React from 'react';
import { Button, createStyles, Group, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import useLoginMutation from './useLoginMutation';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: 'min(100vh, 100%)',
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    height: 'min(100vh, 900px)',
    maxWidth: 450,
    paddingTop: 80,
    position: 'relative',

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

function LoginForm() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const login = useLoginMutation();

  const handleSubmit = (values: typeof form.values) => {
    login.mutate({ username: values.email, password: values.password });
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
          OnRewind Admin VMS
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            required
            label="Username"
            placeholder="who are you"
            {...form.getInputProps('email')}
          />
          <PasswordInput required label="password" {...form.getInputProps('password')} />
          <Group position="right" mt="md">
            <Button loading={login.isLoading} type="submit">
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}

export default LoginForm;
