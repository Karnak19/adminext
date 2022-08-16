import React, { useMemo, useState } from 'react';
import { Avatar, Stack, Table, TextInput } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { Users } from 'tabler-icons-react';

import StatusBadge from '../../components/StatusBadge';
import TdClipboardId from '../../components/TdClipboardId';
import { useSelected } from '../../hooks/useSelectedStyle';
import { useGetFanByIdQuery, useGetFanProductsQuery, useGetFansQuery } from '.';
import { Fan } from './fetcher';

function FansList({ isRoot }: { isRoot?: boolean }) {
  const { data = [] } = useGetFansQuery();

  const [search, setSearch] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(data || [], {
        keys: ['email', 'username', 'id'],
        minMatchCharLength: 2,
      }),
    [data],
  );

  const fuzzyResults = useMemo(
    () =>
      fuse?.search(search).map(({ item }) => {
        return <Item key={item.id} item={item} isRoot={isRoot} />;
      }),
    [fuse, search],
  );

  const results = data?.map((item) => <Item key={item.id} item={item} isRoot={isRoot} />);

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
            <th>Avatar</th>
            <th>Email</th>
            {isRoot && (
              <>
                <th>Username</th>
                <th>Status</th>
                <th>Profiles</th>
                <th>Products</th>
              </>
            )}
            <th>Copy ID</th>
          </tr>
        </thead>
        <tbody>{search ? fuzzyResults : results}</tbody>
      </Table>
    </Stack>
  );
}

export default FansList;

function Item({ item, isRoot }: { isRoot?: boolean; item: Fan }) {
  const router = useRouter();
  const { classes, isSelected } = useSelected('fanId');

  const { data } = useGetFanByIdQuery(item.id);
  const { data: products } = useGetFanProductsQuery(item.id);

  return (
    <tr
      style={{
        cursor: 'pointer',
      }}
      key={item.id}
      onClick={() => router.push(`/fans/${item.id}?tabs=general`)}
      className={isSelected(item.id) ? classes.root : undefined}
    >
      <td>
        <Avatar color="blue" src={`${item.imageUrl}`} alt={item.username} />
      </td>
      <td>{item.email}</td>
      {isRoot && (
        <>
          <td>{item.username}</td>
          <td>
            <StatusBadge status={item.status} />
          </td>
          <td>{data?.Profiles.length}</td>
          <td>{products?.items.length}</td>
        </>
      )}
      <TdClipboardId id={item.id} />
    </tr>
  );
}
