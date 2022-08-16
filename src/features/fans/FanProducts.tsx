import React from 'react';
import { Table } from '@mantine/core';

import ProviderBadge from '../../components/ProviderBadge';
import StatusBadge from '../../components/StatusBadge';
import { FanProduct } from './fetcher';

const cols = ['Product', 'Provider', 'Start Date', 'Type', 'Status'];

function FanProducts({ products }: { products: FanProduct[] }) {
  return (
    <div style={{ paddingTop: '3rem' }}>
      <Table>
        <thead>
          <tr>
            {cols.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.data.productName}</td>
              <td>{product.provider && <ProviderBadge provider={product.provider} />}</td>
              <td>
                {product.data.subscription
                  ? new Date(product.data.subscription.startDate * 1000).toLocaleDateString()
                  : ''}
              </td>
              <td>{product.data.subscription ? 'Subscription' : ''}</td>
              <td>
                <StatusBadge status={product.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FanProducts;
