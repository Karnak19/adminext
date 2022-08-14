import React from 'react';
import { Badge, Table } from '@mantine/core';

import { FanProduct } from './fetcher';

const cols = ['Product', 'Provider', 'Start Date', 'Type', 'Status'];

function FanProducts({ products }: { products: FanProduct[] }) {
  const providerColor = (provider: string) => {
    switch (provider) {
      case 'stripe':
        return 'grape';
      default:
        return 'blue';
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green';
      default:
        return 'blue';
    }
  };

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
              <td>
                {product.provider && (
                  <Badge color={providerColor(product.provider)}>{product.provider}</Badge>
                )}
              </td>
              <td>
                {product.data.subscription
                  ? new Date(product.data.subscription.startDate * 1000).toLocaleDateString()
                  : ''}
              </td>
              <td>{product.data.subscription ? 'Subscription' : ''}</td>
              <td>
                <Badge color={statusColor(product.status)}>{product.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FanProducts;
