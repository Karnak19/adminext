import React from 'react';
import { LoadingOverlay, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';
import { FaceIdError } from 'tabler-icons-react';

import FanPageLayout from '../../src/components/FanPageLayout';
import useFanByIdQuery from '../../src/hooks/useFanByIdQuery';

const tabsMap: {
  [key: string]: number;
} = {
  general: 0,
  profiles: 1,
};

function FanId() {
  const router = useRouter();
  const { isLoading, data } = useFanByIdQuery();

  return (
    <FanPageLayout>
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
          <Tabs.Tab label="General">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Tabs.Tab>
          <Tabs.Tab label="Profiles">
            <div>
              <FaceIdError />
            </div>
          </Tabs.Tab>
        </Tabs>
      )}
    </FanPageLayout>
  );
}

export default FanId;
