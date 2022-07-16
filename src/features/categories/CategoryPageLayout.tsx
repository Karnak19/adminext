import React from 'react';
import { Grid, LoadingOverlay } from '@mantine/core';

import { CategoriesList, useGetCategoriesQuery } from '.';

function CategoryPageLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useGetCategoriesQuery();

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
        <CategoriesList />
      </Grid.Col>
      <Grid.Col span={9}>{children}</Grid.Col>
    </Grid>
  );
}

export default CategoryPageLayout;
