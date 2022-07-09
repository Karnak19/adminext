import { LoadingOverlay, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';

import Display from '../../src/components/categories/Display';
import Edito from '../../src/components/categories/Edito';
import CategoryPageLayout from '../../src/components/CategoryPageLayout';
import VideosList from '../../src/components/VideosList';
import { Video } from '../../src/fetcher/contents/videos';
import useCategoryByIdQuery from '../../src/hooks/useCategoryByIdQuery';

const tabsMap: {
  [key: string]: number;
} = {
  display: 0,
  videos: 1,
  playlists: 2,
};

function CategoryId() {
  const { data, isLoading } = useCategoryByIdQuery();
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
              <Edito {...data} />
            </Tabs.Tab>
          </Tabs>
        )}
      </div>
    </CategoryPageLayout>
  );
}

export default CategoryId;
