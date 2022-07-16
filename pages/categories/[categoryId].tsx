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
  [key: string]: number;
} = {
  display: 0,
  videos: 1,
  playlists: 2,
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
            <Tabs.Tab label="Playlists">
              <PlaylistsList playlists={data.Playlists as Playlist[]} />
            </Tabs.Tab>
          </Tabs>
        )}
      </div>
    </CategoryPageLayout>
  );
}

export default CategoryId;
