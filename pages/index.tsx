import { useMemo } from 'react';
import { createStyles, SimpleGrid, useMantineTheme } from '@mantine/core';
import { Category, Id, Playlist, Users, Video } from 'tabler-icons-react';

import Stat from '../src/components/home/Stat';
import { useGetCategoriesQuery } from '../src/features/categories';
import { useGetFansQuery } from '../src/features/fans';
import { useGetPlaylistsQuery } from '../src/features/playlists';
import { useGetVideosQuery } from '../src/features/videos';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

export default function Home() {
  const { data: categories } = useGetCategoriesQuery();
  const { data: fans } = useGetFansQuery();
  const { data: videos } = useGetVideosQuery();
  const { data: playlists } = useGetPlaylistsQuery();
  const { colors } = useMantineTheme();

  const data = useMemo(() => {
    return [
      {
        title: 'Categories',
        icon: <Category color={colors.blue[0]} />,
        value: categories?.length || 0,
        path: '/categories',
      },
      {
        title: 'Fans',
        icon: <Users color={colors.blue[0]} />,
        value: fans?.length || 0,
        path: '/fans',
      },
      {
        title: 'Videos',
        icon: <Video color={colors.blue[0]} />,
        value: videos?.length || 0,
        path: '/videos',
      },
      {
        title: 'Playlists',
        icon: <Playlist color={colors.blue[0]} />,
        value: playlists?.length || 0,
        path: '/playlists',
      },
      {
        title: 'Profiles',
        icon: <Id color={colors.blue[0]} />,
        value: 0,
        path: '/profiles',
      },
    ];
  }, [categories, fans, videos]);

  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {data.map((stat, i) => (
          <Stat key={i} {...stat} />
        ))}
      </SimpleGrid>
    </div>
  );
}
