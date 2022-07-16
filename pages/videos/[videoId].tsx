import { LoadingOverlay, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';

import Player from '../../src/components/Player';
import { Display, Edito, useGetVideoByIdQuery, VideoPageLayout } from '../../src/features/videos';
import Links from '../../src/features/videos/Links';

const tabsMap: {
  [key: string]: number;
} = {
  display: 0,
  edito: 1,
  links: 2,
  player: 3,
};

function VideoId() {
  const { data, isLoading } = useGetVideoByIdQuery();
  const router = useRouter();

  return (
    <VideoPageLayout>
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
              <Display {...data} />
            </Tabs.Tab>
            <Tabs.Tab label="Edito">
              <Edito {...data} />
            </Tabs.Tab>
            <Tabs.Tab label="Links">
              <Links {...data} />
            </Tabs.Tab>
            <Tabs.Tab label="Player">
              <Player
              // videoId={data.id} url={data.url}
              />
            </Tabs.Tab>
          </Tabs>
        )}
      </div>
    </VideoPageLayout>
  );
}

export default VideoId;
