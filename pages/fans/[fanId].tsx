import React from 'react';
import { Button, LoadingOverlay, Tabs } from '@mantine/core';
import { useRouter } from 'next/router';

import { FanPageLayout, useGetFanByIdQuery, useGetFanProductsQuery } from '../../src/features/fans';
import Edit from '../../src/features/fans/Edit';
import FanProducts from '../../src/features/fans/FanProducts';

const tabsMap: {
  [key: string]: string;
} = {
  general: 'general',
  profiles: 'profiles',
};

function FanId() {
  const router = useRouter();
  const { isLoading, data, refetch, isRefetching } = useGetFanByIdQuery();
  const { data: fanProducts, refetch: refetchProducts } = useGetFanProductsQuery();

  const bulkRefetch = () => {
    refetch();
    refetchProducts();
  };

  return (
    <FanPageLayout>
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
          <Button color="yellow" onClick={bulkRefetch}>
            Refresh fan
          </Button>
          <Tabs.List>
            {Object.values(tabsMap).map((tab) => (
              <Tabs.Tab value={tab} key={tab}>
                {tab.toUpperCase()}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <LoadingOverlay visible={isLoading || isRefetching} />
            <Tabs.Panel value="general">
              <Edit {...data} />
              <FanProducts products={fanProducts?.items || []} />
            </Tabs.Panel>
            <Tabs.Panel value="profiles">
              <pre>{JSON.stringify(data.Profiles, null, 2)}</pre>
            </Tabs.Panel>
          </div>
        </Tabs>
      )}
    </FanPageLayout>
  );
}

export default FanId;
