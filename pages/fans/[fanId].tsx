import React from 'react';
import { LoadingOverlay, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';

import { FanPageLayout, useGetFanByIdQuery } from '../../src/features/fans';
import Edit from '../../src/features/fans/Edit';

const tabsMap: {
  [key: string]: string;
} = {
  general: 'general',
  profiles: 'profiles',
};

function FanId() {
  const router = useRouter();
  const { isLoading, data } = useGetFanByIdQuery();

  return (
    <FanPageLayout>
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
          <Tabs.Panel value="general">
            <Edit {...data} />
          </Tabs.Panel>
          <Tabs.Panel value="profiles">
            <pre>{JSON.stringify(data.Profiles, null, 2)}</pre>
          </Tabs.Panel>
        </Tabs>
      )}
    </FanPageLayout>
  );
}

export default FanId;
