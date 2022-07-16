import React from 'react';
import { Grid, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { Category } from './fetcher';

function Edito(data: Category) {
  const form = useForm({
    initialValues: {
      title: data.name,
      description: data.description,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            required
            label="Title"
            placeholder="Video Title"
            {...form.getInputProps('title')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            required
            label="Description"
            placeholder="Video Description"
            {...form.getInputProps('description')}
          />
        </Grid.Col>
      </Grid>
    </form>
  );
}

export default Edito;
