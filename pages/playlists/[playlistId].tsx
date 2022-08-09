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
  [key: string]: string;
} = {
  display: 'display',
  videos: 'videos',
};
function PlaylistId() {
  const router = useRouter();
  const { data, isLoading } = useGetPlaylistByIdQuery();
  return (
    <PlaylistPageLayout>
      <LoadingOverlay visible={isLoading} />
      {data && (
        <Tabs
          value={tabsMap[router.query.tabs as string]}
          onTabChange={(i) =>
            router.push({
              pathname: router.asPath.split('?')[0],
              query: { tabs: Object.keys(tabsMap).find((k) => tabsMap[k] === i) },
            })
          }
        >
          <Tabs.List>
            {Object.values(tabsMap).map((tab) => (
              <Tabs.Tab value={tab} key={tab}>
                {tab.toUpperCase()}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Tab value="display">
            <Edito {...data} />
            <Display {...data} />
          </Tabs.Tab>
          <Tabs.Tab value="videos">
            <VideosList videos={data.Videos as Video[]} />
          </Tabs.Tab>
        </Tabs>
      )}
    </PlaylistPageLayout>
  );
}

export default PlaylistId;
