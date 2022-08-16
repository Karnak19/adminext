import React, { useMemo, useState } from 'react';
import { Stack, Table, TextInput } from '@mantine/core';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { Users } from 'tabler-icons-react';

import StatusBadge from '../../components/StatusBadge';
import { useSelected } from '../../hooks/useSelectedStyle';
import { useGetProductsQuery } from './hooks';
import { Item } from './Products';

function ProductsList() {
  const { data } = useGetProductsQuery();

  const [search, setSearch] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(data?.items || [], {
        keys: ['email'],
        minMatchCharLength: 2,
      }),
    [data],
  );

  const fuzzyResults = useMemo(
    () =>
      fuse?.search(search).map(({ item }) => {
        return <ResultItem key={item.id} {...item} />;
      }),
    [fuse, search],
  );

  const results = data?.items.map((item) => <ResultItem key={item.id} {...item} />);

  return (
    <Stack>
      <div>
        <TextInput
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter fans"
          icon={<Users />}
        />
      </div>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Description</th>
            <th>Status</th>
            <th>Payment offers</th>
          </tr>
        </thead>
        <tbody>{search ? fuzzyResults : results}</tbody>
      </Table>
    </Stack>
  );
}

function ResultItem(item: Item) {
  const router = useRouter();
  const { classes, isSelected } = useSelected('fanId');

  return (
    <tr
      style={{
        cursor: 'pointer',
      }}
      key={item.id}
      onClick={() => router.push(`/products/${item.id}?tabs=general`)}
      className={isSelected(item.id) ? classes.root : undefined}
    >
      <td>{item.name}</td>
      <td>{item.data.description?.substring(0, 20)}...</td>
      <td>
        <StatusBadge status={item.status} />
      </td>
      <td>{item.paymentOffers.length}</td>
    </tr>
  );
}

export default ProductsList;
