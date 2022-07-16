import { LoadingOverlay, Tabs } from '@mantine/core';

import { Display, Edito, useGetVideoByIdQuery, VideoPageLayout } from '../../src/features/videos';

function VideoId() {
  const { data, isLoading } = useGetVideoByIdQuery();
  return (
    <VideoPageLayout>
      <div
        style={{
          position: 'relative',
        }}
      >
        <LoadingOverlay visible={isLoading} />
        {data && (
          <Tabs>
            <Tabs.Tab label="Display">
              <Display {...data} />
            </Tabs.Tab>
            <Tabs.Tab label="Edito">
              <Edito {...data} />
            </Tabs.Tab>
          </Tabs>
        )}
      </div>
    </VideoPageLayout>
  );
}

export default VideoId;
