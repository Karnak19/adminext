import React from 'react';
import { Button, Grid, LoadingOverlay } from '@mantine/core';

import { useGetModulesCombinedQuery } from '../../features/modules';
import ModuleChecker from './ModuleChecker';

function Modules() {
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
    <Grid
      style={{
        position: 'relative',
      }}
      gutter="lg"
    >
      <LoadingOverlay visible={isLoading} />
      <>
        {allData
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((module) => {
            return (
              <Grid.Col key={module.id} xs={6} md={4} lg={3}>
                <ModuleChecker
                  title={module.name}
                  key={module.id}
                  id={module.id}
                  isNew={!isOld(module.id)}
                  checked={!!newModules.find((mod) => mod === module.id)}
                  handleChange={handleChange}
                />
              </Grid.Col>
            );
          })}
      </>
      <Grid.Col span={8} offset={2}>
        <Button size="xl" loading={mutation.isLoading} fullWidth onClick={() => mutation.mutate()}>
          Save
        </Button>
      </Grid.Col>
    </Grid>
  );
}

export default Modules;
