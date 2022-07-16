import React, { useMemo, useState } from 'react';
import { Avatar, Stack, Table, TextInput } from '@mantine/core';
import Fuse from 'fuse.js';
import { useRouter } from 'next/router';
import { Video } from 'tabler-icons-react';

import { useGetVideosQuery } from '.';
import { Video as TVideo } from './fetcher';

function VideosList({ videos }: { videos?: TVideo[] }) {
  const router = useRouter();
  const { data } = useGetVideosQuery(!videos);

  const [search, setSearch] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(videos || data || [], {
        keys: ['name'],
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
            onClick={() => router.push(`/videos/${item.id}`)}
          >
            <td>
              <Avatar src={`${item.poster}?auto=format&h=120&w=120`} />
            </td>
            <td>{item.name}</td>
          </tr>
        );
      }),
    [fuse, search],
  );

  const results = (videos || data)?.map((video) => (
    <tr
      style={{
        cursor: 'pointer',
      }}
      key={video.id}
      onClick={() => router.push(`/videos/${video.id}`)}
    >
      <td>
        <Avatar src={`${video.poster}?auto=format&h=120&w=120`} />
      </td>
      <td>{video.name}</td>
    </tr>
  ));

  return (
    <Stack>
      <div>
        <TextInput
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter videos"
          icon={<Video />}
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

export default VideosList;
