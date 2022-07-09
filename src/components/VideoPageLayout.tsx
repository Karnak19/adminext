import React from 'react';
import { Grid, LoadingOverlay } from '@mantine/core';

import useVideosQuery from '../hooks/useVideosQuery';
import VideosList from './VideosList';

function VideoPageLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useVideosQuery();

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
        <VideosList />
      </Grid.Col>
      <Grid.Col span={9}>{children}</Grid.Col>
    </Grid>
  );
}

export default VideoPageLayout;
