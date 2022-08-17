import React, { useEffect, useState } from 'react';
import { Grid, MultiSelect, Select } from '@mantine/core';
import { useRouter } from 'next/router';

import { useGetCategoriesQuery } from '../categories';
import { useGetPlaylistsQuery } from '../playlists';
import { Video } from './fetcher';
import { useGetVideoByIdQuery } from './hooks';

function Links(props: Video) {
  const [value, setValue] = useState(() => props.Categories.map((cat) => cat.id));
  const [playlist, setPlaylist] = useState(() => props.PlaylistId);
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: playlists = [] } = useGetPlaylistsQuery();
  const { refetch, isRefetching } = useGetVideoByIdQuery();

  const router = useRouter();

  useEffect(() => {
    refetch().then((res) => {
      setValue((res.data?.Categories || []).map((cat) => cat.id));
      setPlaylist(res.data?.PlaylistId ?? '');
    });
  }, [router.query.videoId]);

  return (
    <Grid>
      <Grid.Col span={6}>
        <MultiSelect
          data={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          value={value}
          onChange={setValue}
          disabled={isRefetching}
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
          value={playlist}
          disabled={isRefetching}
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
