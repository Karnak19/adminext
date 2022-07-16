import { LoadingOverlay, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';

import {
  Display,
  Edito,
  PlaylistPageLayout,
  useGetPlaylistByIdQuery,
} from '../../src/features/playlists';
import { VideosList } from '../../src/features/videos';
import { Video } from '../../src/features/videos/fetcher';

const tabsMap: {
  [key: string]: number;
} = {
  display: 0,
  videos: 1,
};
function PlaylistId() {
  const router = useRouter();
  const { data, isLoading } = useGetPlaylistByIdQuery();
  return (
    <PlaylistPageLayout>
      <LoadingOverlay visible={isLoading} />
      {data && (
        <Tabs
          active={tabsMap[router.query.tabs as string]}
          onTabChange={(i) =>
            router.push({
              pathname: router.asPath.split('?')[0],
              query: { tabs: Object.keys(tabsMap).find((k) => tabsMap[k] === i) },
            })
          }
        >
          <Tabs.Tab label="Display">
            <Edito {...data} />
            <Display {...data} />
          </Tabs.Tab>
          <Tabs.Tab label="Videos">
            <VideosList videos={data.Videos as Video[]} />
          </Tabs.Tab>
        </Tabs>
      )}
    </PlaylistPageLayout>
  );
}

export default PlaylistId;
