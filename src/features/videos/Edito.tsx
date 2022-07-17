import React from 'react';
import { Grid, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import dynamic from 'next/dynamic';

import { Video } from './fetcher';
import { useMutateVideo } from './hooks';

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => null,
});

function Edito(data: Video) {
  const form = useForm({
    initialValues: {
      name: data.name,
      description: data.description,
      fullDescription: data.fullDescription,
      technicalDescription: data.technicalDescription,
    },
  });

  const mutation = useMutateVideo();

  const handleSubmit = (values: typeof form.values) => {
    // eslint-disable-next-line no-console

    mutation.mutate(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            required
            label="Title"
            placeholder="Video Title"
            {...form.getInputProps('name')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Short Description"
            placeholder="Short Description"
            {...form.getInputProps('description')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <RichTextEditor
            placeholder="Long Description"
            controls={[
              ['bold', 'italic', 'underline', 'link'],
              ['h1', 'h2', 'h3', 'h4', 'alignLeft', 'alignCenter', 'alignRight'],
            ]}
            {...form.getInputProps('fullDescription')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <RichTextEditor
            placeholder="Video Description"
            controls={[
              ['bold', 'italic', 'underline', 'link'],
              ['h1', 'h2', 'h3', 'h4', 'alignLeft', 'alignCenter', 'alignRight'],
            ]}
            {...form.getInputProps('technicalDescription')}
          />
        </Grid.Col>
        <Grid.Col span={8} offset={2}>
          <button type="submit">Save</button>
        </Grid.Col>
      </Grid>
    </form>
  );
}

export default Edito;
