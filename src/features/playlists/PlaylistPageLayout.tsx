import React from 'react';
import { Grid, LoadingOverlay } from '@mantine/core';

import { useGetPlaylistsQuery } from './hooks';
import PlaylistsList from './PlaylistsList';

function PlaylistPageLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useGetPlaylistsQuery();

  return (
    <Grid
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <LoadingOverlay visible={isLoading} />
      <Grid.Col span={3}>
        <PlaylistsList />
      </Grid.Col>
      <Grid.Col span={9}>{children}</Grid.Col>
    </Grid>
  );
}

export default PlaylistPageLayout;
