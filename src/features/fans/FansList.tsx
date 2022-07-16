import React, { useMemo, useState } from 'react';
import { Avatar, Stack, Table, TextInput } from '@mantine/core';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { Users } from 'tabler-icons-react';

import { useSelected } from '../../hooks/useSelectedStyle';
import { useGetFansQuery } from '.';

function VideosList() {
  const router = useRouter();
  const { classes, isSelected } = useSelected('fanId');
  const { data = [] } = useGetFansQuery();

  const [search, setSearch] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(data || [], {
        keys: ['username', 'email'],
        minMatchCharLength: 2,
      }),
    [data],
  );

  const fuzzyResults = useMemo(
    () =>
      fuse?.search(search).map(({ item }) => {
        return (
          <tr
            style={{
              cursor: 'pointer',
            }}
            key={item.id}
            onClick={() => router.push(`/fans/${item.id}`)}
            className={isSelected(item.id) ? classes.root : undefined}
          >
            <td>{item.username}</td>
            <td>{item.email}</td>
          </tr>
        );
      }),
    [fuse, search],
  );

  const results = data?.map((item) => (
    <tr
      style={{
        cursor: 'pointer',
      }}
      key={item.id}
      onClick={() => router.push(`/fans/${item.id}`)}
      className={isSelected(item.id) ? classes.root : undefined}
    >
      <td>
        <Avatar color="blue" src={`${item.imageUrl}`} alt={item.username}>
          {item.firstname?.[0]}
          {item.lastname?.[0]}
        </Avatar>
      </td>
      <td>{item.username}</td>
      <td>{item.email}</td>
    </tr>
  ));

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
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{search ? fuzzyResults : results}</tbody>
      </Table>
    </Stack>
  );
}

export default VideosList;
