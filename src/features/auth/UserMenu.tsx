import React, { forwardRef } from 'react';
import { useQueryClient } from 'react-query';
import { Avatar, Group, Loader, MediaQuery, Menu, Text, UnstyledButton } from '@mantine/core';
import { removeCookies } from 'cookies-next';
import { ChevronRight, Logout } from 'tabler-icons-react';

import { ACCESS_TOKEN_KEY } from '../../app/getToken';
import { useStore } from '../../app/store';
import { useMeQuery } from '.';

// eslint-disable-next-line react/display-name
const ControlButton = forwardRef<HTMLButtonElement>((props, ref) => {
  const { me } = useMeQuery();

  if (me.isLoading && !me.data) {
    return <Loader />;
  }

  return (
    <UnstyledButton
      {...props}
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <Avatar src={null} color="blue" radius="xl" alt={me.data.firstName}>
          {me.data.firstName[0]}
        </Avatar>
        <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {me.data.firstName}
            </Text>

            <Text color="dimmed" size="xs">
              {me.data.email}
            </Text>
          </div>
        </MediaQuery>

        <ChevronRight size={16} />
      </Group>
    </UnstyledButton>
  );
});

function UserMenu() {
  const queryClient = useQueryClient();
  const resetStore = useStore((store) => store.reset);

  const logout = () => {
    removeCookies(ACCESS_TOKEN_KEY);
    queryClient.invalidateQueries(['me']);
    queryClient.invalidateQueries(['context']);
    resetStore();
  };

  return (
    <Group position="center">
      <Menu withArrow placement="center" control={<ControlButton />}>
        <Menu.Item icon={<Logout />} onClick={logout}>
          <Text size="sm" weight={500}>
            Logout
          </Text>
        </Menu.Item>
      </Menu>
    </Group>
  );
}

export default UserMenu;
