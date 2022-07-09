import { PropsWithChildren, useState } from 'react';
import {
  AppShell,
  Burger,
  Grid,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';

import AccountSelector from './AccountSelector';
import UserMenu from './UserMenu';

// eslint-disable-next-line @typescript-eslint/ban-types
function Layout({ children }: PropsWithChildren<{}>) {
  const [opened, setOpened] = useState(false);

  const theme = useMantineTheme();

  return (
    <AppShell
      padding="md"
      fixed
      style={{
        overflowX: 'hidden',
      }}
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 230 }}>
          <Navbar.Section grow mt="md">
            <Text>Application navbar</Text>
          </Navbar.Section>
          <Navbar.Section>
            <AccountSelector />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <Grid justify="space-between">
            <Grid.Col span={1}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
            </Grid.Col>
            <Grid.Col
              span={3}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <UserMenu />
            </Grid.Col>
          </Grid>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}

export default Layout;
