import React from 'react';
import { Grid, LoadingOverlay } from '@mantine/core';
import { useRouter } from 'next/router';

import { useGetProductsQuery } from './hooks';
import ProductsList from './ProductsList';

function ProductPageLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoading } = useGetProductsQuery();

  const isRoot = router.pathname === '/products';

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
        <ProductsList />
      </Grid.Col>
      <Grid.Col span={8}>{children}</Grid.Col>
    </Grid>
  );
}

export default ProductPageLayout;
