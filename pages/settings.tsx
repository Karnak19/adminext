import React from 'react';
import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router';

import Modules from '../src/components/settings/Modules';

const tabsMap: {
  [key: string]: number;
} = {
  general: 0,
  modules: 1,
};

function Settings() {
  const router = useRouter();
  return (
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
        <>hello</>
      </Tabs.Tab>

      <Tabs.Tab label="Modules">
        <Modules />
      </Tabs.Tab>
    </Tabs>
  );
}

export default Settings;
