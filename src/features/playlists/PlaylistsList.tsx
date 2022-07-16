import React, { useMemo, useState } from 'react';
import { Avatar, Stack, Table, TextInput } from '@mantine/core';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { Playlist } from 'tabler-icons-react';

import { useSelected } from '../../hooks/useSelectedStyle';
import { useGetPlaylistsQuery } from '.';
import { Playlist as TPlaylist } from './fetcher';

function PlaylistsList({ playlists }: { playlists?: TPlaylist[] }) {
  const { classes, isSelected } = useSelected('playlistId');

  const router = useRouter();
  const { data = [] } = useGetPlaylistsQuery(!playlists);

  const [search, setSearch] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(playlists || data || [], {
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
        className={isSelected(item.id) ? classes.root : undefined}
      >
        <td>
          <Avatar src={`${item.thumbnail}?auto=format&h=120&w=120`} />
        </td>
        <td>{item.name}</td>
      </tr>
    );
  });

  const results = (playlists || data)?.map((playlist) => (
    <tr
      style={{
        cursor: 'pointer',
      }}
      key={playlist.id}
      onClick={() => router.push(`/playlists/${playlist.id}`)}
      className={isSelected(playlist.id) ? classes.root : undefined}
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
