import React from 'react';
import { Grid, LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';

import { FansList, useGetFansQuery } from '.';

function FanPageLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoading } = useGetFansQuery();

  const isRoot = router.pathname === '/fans';

  return (
    <Grid
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <LoadingOverlay visible={isLoading} />
      <Grid.Col span={isRoot ? 12 : 4}>
        <FansList isRoot={isRoot} />
      </Grid.Col>
      <Grid.Col span={8}>{children}</Grid.Col>
    </Grid>
  );
}

export default FanPageLayout;
