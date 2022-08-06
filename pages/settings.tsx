import React from 'react';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router';

import { Modules } from '../src/features/modules';

const tabsMap: {
  [key: string]: string;
} = {
  general: 'general',
  modules: 'modules',
};

function Settings() {
  const router = useRouter();
  return (
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
        <>hello</>
      </Tabs.Panel>

      <Tabs.Panel value="modules">
        <Modules />
      </Tabs.Panel>
    </Tabs>
  );
}

export default Settings;
