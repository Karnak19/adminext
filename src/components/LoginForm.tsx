import React from 'react';
import { Button, Group, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import useLogin from '../hooks/useLogin';

function LoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const login = useLogin();

  const handleSubmit = (values: typeof form.values) => {
    login.mutate({ username: values.email, password: values.password });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        required
        label="Username"
        placeholder="your@email.com"
        {...form.getInputProps('email')}
      />
      <PasswordInput required label="password" {...form.getInputProps('password')} />
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}

export default LoginForm;
