import { LoadingOverlay, Tabs } from '@mantine/core';

import Display from '../../src/components/categories/Display';
import Edito from '../../src/components/categories/Edito';
import CategoryPageLayout from '../../src/components/CategoryPageLayout';
import VideosList from '../../src/components/VideosList';
import { Video } from '../../src/fetcher/contents/videos';
import useCategoryByIdQuery from '../../src/hooks/useCategoryByIdQuery';

function CategoryId() {
  const { data, isLoading } = useCategoryByIdQuery();
  return (
    <CategoryPageLayout>
      <div
        style={{
          position: 'relative',
        }}
      >
        <LoadingOverlay visible={isLoading} />
        {data && (
          <Tabs>
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
