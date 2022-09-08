import React from 'react';
import { Button, Grid, MultiSelect, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useGetProfilesQuery, useMutateProducts } from './hooks';

function CreateProductForm() {
  const form = useForm<{
    name: string;
    description: string;
    paymentOffers: string[];
    profileIds: string[];
  }>();
  const mutation = useMutateProducts();
  const { data = [] } = useGetProfilesQuery();

  const handleSubmit = form.onSubmit((values) => mutation.mutate(values));

  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <Grid.Col span={12}>
          <TextInput {...form.getInputProps('name')} label="Name" placeholder="Name" />
        </Grid.Col>
        <Grid.Col span={12}>
          <TextInput {...form.getInputProps('description')} label="Name" placeholder="Name" />
        </Grid.Col>

        <Grid.Col span={12}>
          <MultiSelect
            data={data.map((prof) => ({
              value: prof.id,
              label: prof.name,
            }))}
            label="Profiles"
            placeholder="Pick some profiles"
            {...form.getInputProps('profileIds')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Button type="submit" disabled>
            Create
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
}

export default CreateProductForm;
