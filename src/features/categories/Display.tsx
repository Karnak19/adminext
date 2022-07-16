import React from 'react';
import { Grid, Image } from '@mantine/core';

import { Category } from './fetcher';

function Display(data: Category) {
  return (
    <Grid>
      <Grid.Col span={6}>
        <Image
          src={data.thumbnail ?? undefined}
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
