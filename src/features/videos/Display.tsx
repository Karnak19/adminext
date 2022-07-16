import React from 'react';
import { Grid, Image, Title } from '@mantine/core';

import { Video } from './fetcher';

function Display(data: Video) {
  return (
    <Grid>
      <Grid.Col span={12}>
        <Title order={1}>{data.name}</Title>
      </Grid.Col>
      <Grid.Col span={6}>
        <Image
          src={data.poster ?? undefined}
          alt="With default placeholder"
          caption="Landscape"
          withPlaceholder
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <Image
          src={data.portraitThumbnail ?? undefined}
          alt="With default placeholder"
          caption="Portrait"
          withPlaceholder
        />
      </Grid.Col>
    </Grid>
  );
}

export default Display;
