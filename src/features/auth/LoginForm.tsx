import React from 'react';
import { Button, createStyles, Group, Paper, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import useLoginMutation from './useLoginMutation';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: '100vh',
    display: 'grid',
    placeItems: 'center',
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://assets.website-files.com/605c6a95b5fd727aeb0983c5/60d321731ef1dd7f6efd9e95_header_ourwork.png)',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      placeItems: 'start',
    },
  },

  form: {
    width: 'min(100%, 450px)',
    padding: '2rem 4rem',
    backgroundColor: theme.fn.rgba(
      theme.colorScheme === 'dark' ? theme.colors.dark[9] : 'ffffff',
      0.2,
    ),
    backdropFilter: 'blur(15px)',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: '100vw',
    },
  },

  flex: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  title: {
    color: theme.white,
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
      <Paper className={classes.form} radius={5}>
        <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
          Origins Digital VMS
        </Title>

        <form onSubmit={form.onSubmit(handleSubmit)} className={classes.flex}>
          <TextInput
            required
            label="Username"
            placeholder="who are you"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="********"
            {...form.getInputProps('password')}
          />
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
