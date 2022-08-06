import { LoadingOverlay, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';

import {
  CategoryPageLayout,
  Display,
  Edito,
  useGetCategoryByIdQuery,
} from '../../src/features/categories';
import { PlaylistsList } from '../../src/features/playlists';
import { Playlist } from '../../src/features/playlists/fetcher';
import { VideosList } from '../../src/features/videos';
import { Video } from '../../src/features/videos/fetcher';

const tabsMap: {
  [key: string]: string;
} = {
  display: 'display',
  videos: 'videos',
  playlists: 'playlists',
};

function CategoryId() {
  const { data, isLoading } = useGetCategoryByIdQuery();
  const router = useRouter();

  return (
    <CategoryPageLayout>
      <div
        style={{
          position: 'relative',
        }}
      >
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
            <Tabs.Panel value="display">
              <Edito {...data} />
              <Display {...data} />
            </Tabs.Panel>
            <Tabs.Panel value="videos">
              <VideosList videos={data.Videos as unknown as Video[]} />
            </Tabs.Panel>
            <Tabs.Panel value="playlists">
              <PlaylistsList playlists={data.Playlists as Playlist[]} />
            </Tabs.Panel>
          </Tabs>
        )}
      </div>
    </CategoryPageLayout>
  );
}

export default CategoryId;
