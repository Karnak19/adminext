import { LoadingOverlay, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';

import Player from '../../src/components/Player';
import { Display, Edito, useGetVideoByIdQuery, VideoPageLayout } from '../../src/features/videos';
import Links from '../../src/features/videos/Links';

const tabsMap: {
  [key: string]: string;
} = {
  display: 'display',
  edito: 'edito',
  links: 'links',
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
              <Display {...data} />
            </Tabs.Panel>
            <Tabs.Panel value="edito">
              <Edito {...data} />
            </Tabs.Panel>
            <Tabs.Panel value="links">
              <Links {...data} />
            </Tabs.Panel>
            <Tabs.Panel value="player">
              <Player
              // videoId={data.id} url={data.url}
              />
            </Tabs.Panel>
          </Tabs>
        )}
      </div>
    </VideoPageLayout>
  );
}

export default VideoId;
