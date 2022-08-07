import React, { useEffect } from 'react';
import { Button, Grid, LoadingOverlay, MultiSelect, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useGetProfilesQuery, useMutateFanProfiles } from '../profiles';
import { FanWithProfiles } from './fetcher';

function Edit(props: FanWithProfiles) {
  const form = useForm({
    initialValues: {
      firstname: props.firstname,
      lastname: props.lastname,
      email: props.email,
      username: props.username,
      gender: props.gender,
      birthdate: props.birthdate,
      profiles: props.Profiles.map((profile) => profile.id),
    },
  });

  useEffect(() => {
    form.setValues({
      firstname: props.firstname,
      lastname: props.lastname,
      email: props.email,
      username: props.username,
      gender: props.gender,
      birthdate: props.birthdate,
      profiles: props.Profiles.map((profile) => profile.id),
    });
  }, [props.email]);

  const { data: profiles = [] } = useGetProfilesQuery();

  const mutateFanProfiles = useMutateFanProfiles();

  const handleSubmit = form.onSubmit((values) => {
    if (values.profiles) {
      mutateFanProfiles.mutate({
        fanId: props.id,
        profiles: values.profiles,
      });
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <LoadingOverlay visible={mutateFanProfiles.isLoading} />
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Firstname"
            placeholder="Firstname"
            {...form.getInputProps('firstname')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Lastname" placeholder="Lastname" {...form.getInputProps('lastname')} />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput label="Email" placeholder="Email" {...form.getInputProps('email')} />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            data={['Male', 'Female', 'Other']}
            defaultValue={props.gender}
            placeholder="Pick a gender"
            label="Gender"
            {...form.getInputProps('gender')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          {/* <DatePicker
          placeholder="Pick a birthdate"
          label="Birth date"
          defaultValue={new Date(props.birthdate)}
          {...form.getInputProps('birthdate')}
        /> */}
        </Grid.Col>

        <Grid.Col span={12}>
          <MultiSelect
            data={profiles.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))}
            defaultValue={props.Profiles.map((cat) => cat.id)}
            label="Profiles"
            placeholder="Pick all that you like"
            searchable
            nothingFound="Nothing found"
            {...form.getInputProps('profiles')}
          />
        </Grid.Col>
        <Grid.Col>
          <Button type="submit">Update</Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <pre>{JSON.stringify(form.values, null, 2)}</pre>
        </Grid.Col>
      </Grid>
    </form>
  );
}

export default Edit;
