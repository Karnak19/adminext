import { PropsWithChildren, useState } from 'react';
import {
  AppShell,
  Burger,
  Button,
  Grid,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import { Category, Playlist, Video } from 'tabler-icons-react';

import AccountSelector from './AccountSelector';
import UserMenu from './UserMenu';

const pages = [
  {
    name: 'Videos',
    path: '/videos',
    icon: <Video />,
  },
  {
    name: 'Categories',
    path: '/categories',
    icon: <Category />,
  },
  {
    name: 'Playlists',
    path: '/playlists',
    icon: <Playlist />,
  },
];

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
            <Stack justify="center" align="stretch">
              {pages.map((page) => (
                <Link passHref href={page.path} key={page.path}>
                  <Button leftIcon={page.icon}>{page.name}</Button>
                </Link>
              ))}
            </Stack>
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
