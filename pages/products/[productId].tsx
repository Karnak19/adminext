import React from 'react';
import { Button } from '@mantine/core';

import { ProductsPageLayout } from '../../src/features/profilesAndProducts';
import useEscapeKey from '../../src/hooks/useEscapeKey';

function ProductId() {
  useEscapeKey('/products');

  return (
    <ProductsPageLayout>
      <Button color="yellow">Refresh Product</Button>
      <div>WIP</div>
    </ProductsPageLayout>
  );
}

export default ProductId;
