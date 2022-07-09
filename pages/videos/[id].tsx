import { Grid, Image, LoadingOverlay, Text } from '@mantine/core';

import VideoPageLayout from '../../src/components/VideoPageLayout';
import useVideoByIdQuery from '../../src/hooks/useVideosByIdQuery';

function VideoId() {
  const { data, isLoading } = useVideoByIdQuery();
  return (
    <VideoPageLayout>
      <Grid
        style={{
          position: 'relative',
        }}
      >
        <LoadingOverlay visible={isLoading} />
        {data && (
          <>
            <Grid.Col span={12}>
              <Text>{data.name}</Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Image
                src={data.poster ?? undefined}
                alt="With default placeholder"
                caption="Landscape"
                withPlaceholder
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Image
                src={data.portraitThumbnail ?? undefined}
                alt="With default placeholder"
                caption="Portrait"
                withPlaceholder
              />
            </Grid.Col>
          </>
        )}
      </Grid>
    </VideoPageLayout>
  );
}

export default VideoId;
