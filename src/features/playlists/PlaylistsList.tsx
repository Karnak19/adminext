import React, { useMemo, useState } from 'react';
import { Avatar, Stack, Table, TextInput } from '@mantine/core';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { Playlist } from 'tabler-icons-react';

import { useGetPlaylistsQuery } from '.';

function PlaylistsList() {
  const router = useRouter();
  const { data = [] } = useGetPlaylistsQuery();

  const [search, setSearch] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(data || [], {
        keys: ['name'],
        minMatchCharLength: 2,
      }),
    [data],
  );

  const fuzzyResults = fuse.search(search).map(({ item }) => {
    return (
      <tr
        style={{
          cursor: 'pointer',
        }}
        key={item.id}
        onClick={() => router.push(`/playlists/${item.id}`)}
      >
        <td>
          <Avatar src={`${item.thumbnail}?auto=format&h=120&w=120`} />
        </td>
        <td>{item.name}</td>
      </tr>
    );
  });

  const results = data?.map((playlist) => (
    <tr
      style={{
        cursor: 'pointer',
      }}
      key={playlist.id}
      onClick={() => router.push(`/playlists/${playlist.id}`)}
    >
      <td>
        <Avatar src={`${playlist.thumbnail}?auto=format&h=120&w=120`} />
      </td>
      <td>{playlist.name}</td>
    </tr>
  ));

  return (
    <Stack>
      <div>
        <TextInput
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter playlists"
          icon={<Playlist />}
        />
      </div>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>{search ? fuzzyResults : results}</tbody>
      </Table>
    </Stack>
  );
}

export default PlaylistsList;
