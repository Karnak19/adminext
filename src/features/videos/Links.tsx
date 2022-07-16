import React from 'react';
import { Grid, MultiSelect, Select } from '@mantine/core';

import { useGetCategoriesQuery } from '../categories';
import { useGetPlaylistsQuery } from '../playlists';
import { Video } from './fetcher';

function Links(props: Video) {
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: playlists = [] } = useGetPlaylistsQuery();

  return (
    <Grid>
      <Grid.Col span={6}>
        <MultiSelect
          data={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          defaultValue={props.Categories.map((cat) => cat.id)}
          label="Categories"
          placeholder="Pick all that you like"
          searchable
          nothingFound="Nothing found"
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Select
          data={playlists.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          defaultValue={props.PlaylistId}
          label="Playlist"
          placeholder="Pick all that you like"
          searchable
          nothingFound="Nothing found"
        />
      </Grid.Col>
    </Grid>
  );
}

export default Links;
