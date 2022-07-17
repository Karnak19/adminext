import React from 'react';
import { Button, LoadingOverlay, SimpleGrid } from '@mantine/core';

import ModuleChecker from '../src/components/settings/ModuleChecker';
import { useGetModulesCombinedQuery } from '../src/features/modules';

function Settings() {
  const { account, all, setNewModules, newModules, mutation } = useGetModulesCombinedQuery();

  const { data = [], isLoading: accountLoading } = account;
  const { data: allData = [], isLoading: allLoading } = all;

  const isLoading = allLoading || accountLoading;

  const handleChange = (id: string) =>
    setNewModules((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return [...Array.from(newSet)];
    });

  // checking if the account got the module to change the color to blue
  const isOld = (id: string) => new Set(data.map((m) => m.id)).has(id);

  return (
    <SimpleGrid
      cols={5}
      breakpoints={[
        { minWidth: 'sm', cols: 2, spacing: 'sm' },
        { minWidth: 'xs', cols: 1, spacing: 'sm' },
        { minWidth: 'lg', cols: 4, spacing: 'sm' },
      ]}
      style={{
        position: 'relative',
      }}
    >
      <LoadingOverlay visible={isLoading} />
      <>
        {allData
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((module) => {
            return (
              <ModuleChecker
                title={module.name}
                key={module.id}
                id={module.id}
                isNew={!isOld(module.id)}
                checked={!!newModules.find((mod) => mod === module.id)}
                handleChange={handleChange}
              />
            );
          })}
      </>
      <Button onClick={() => mutation.mutate()}>Save</Button>
    </SimpleGrid>
  );
}

export default Settings;
