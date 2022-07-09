import { LoadingOverlay, Tabs } from '@mantine/core';

import Display from '../../src/components/video/Display';
import Edito from '../../src/components/video/Edito';
import VideoPageLayout from '../../src/components/VideoPageLayout';
import useVideoByIdQuery from '../../src/hooks/useVideosByIdQuery';

function VideoId() {
  const { data, isLoading } = useVideoByIdQuery();
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
