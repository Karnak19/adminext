import React, { useMemo, useState } from 'react';
import { Avatar, Stack, Table, TextInput } from '@mantine/core';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { Playlist } from 'tabler-icons-react';

import TdClipboardId from '../../components/TdClipboardId';
import { useSelected } from '../../hooks/useSelectedStyle';
import { useGetCategoryByIdQuery } from '../categories';
import { useGetPlaylistsQuery } from '.';
import { Playlist as TPlaylist } from './fetcher';

function PlaylistsList({ playlists }: { playlists?: TPlaylist[] }) {
  const { data = [] } = useGetPlaylistsQuery(!playlists);
  const router = useRouter();

  const isRoot = router.pathname === '/playlists';

  const [search, setSearch] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(playlists || data || [], {
        keys: ['name', 'id'],

        minMatchCharLength: 2,
      }),
    [data],
  );

  const fuzzyResults = fuse.search(search).map(({ item }) => {
    return <Item key={item.id} item={item} isRoot={isRoot} />;
  });

  const results = (playlists || data)?.map((playlist) => (
    <Item key={playlist.id} item={playlist} isRoot={isRoot} />
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
            {isRoot && (
              <>
                <th>Description</th>
                <th>Category</th>
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

export default PlaylistsList;

function Item({ item, isRoot }: { item: TPlaylist; isRoot?: boolean }) {
  const { classes, isSelected } = useSelected('playlistId');

  const { data } = useGetCategoryByIdQuery(item.CategoryId);

  const router = useRouter();

  return (
    <tr
      style={{
        cursor: 'pointer',
      }}
      key={item.id}
      onClick={() => router.push(`/playlists/${item.id}?tabs=general`)}
      className={isSelected(item.id) ? classes.root : undefined}
    >
      <td>
        <Avatar src={`${item.thumbnail}?auto=format&h=120&w=120`} />
      </td>
      <td>{item.name}</td>
      {isRoot && (
        <>
          <td>{item.description?.substring(0, 20)}...</td>
          <td>{data?.name}</td>
        </>
      )}

      <TdClipboardId id={item.id} />
    </tr>
  );
}
