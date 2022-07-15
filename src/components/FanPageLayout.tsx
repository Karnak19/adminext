import React from 'react';
import { Grid, LoadingOverlay } from '@mantine/core';

import useFansQuery from '../hooks/useFansQuery';
import FansList from './FansList';

function FanPageLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useFansQuery();

  return (
    <Grid
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <LoadingOverlay visible={isLoading} />
      <Grid.Col span={5}>
        <FansList />
      </Grid.Col>
      <Grid.Col span={7}>{children}</Grid.Col>
    </Grid>
  );
}

export default FanPageLayout;
