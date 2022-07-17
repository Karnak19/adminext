import { PropsWithChildren, useState } from 'react';
import {
  AppShell,
  Burger,
  Button,
  createStyles,
  Grid,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Category, Home, Playlist, Settings, Users, Video } from 'tabler-icons-react';

import { AccountSelector } from '../features/account';
import UserMenu from '../features/auth/UserMenu';
import { useGetAccountModulesQuery } from '../features/modules';
import ThemeToggler from './ThemeToggler';

const useStyles = createStyles(() => ({
  flex: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
}));

const pages = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <Home />,
  },
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
  {
    name: 'Fans',
    path: '/fans',
    icon: <Users />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings />,
  },
];

// eslint-disable-next-line @typescript-eslint/ban-types
function Layout({ children }: PropsWithChildren<{}>) {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();
  const router = useRouter();

  useGetAccountModulesQuery();

  const theme = useMantineTheme();

  const isRouteActive = (path: string) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };

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
                  <Button
                    variant={isRouteActive(page.path) ? 'filled' : 'subtle'}
                    leftIcon={page.icon}
                  >
                    {page.name}
                  </Button>
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
            <Grid.Col span={4} className={classes.flex}>
              <UserMenu />
              <ThemeToggler />
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
