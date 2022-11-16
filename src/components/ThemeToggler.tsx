import { Group, Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { MoonStars, Sun } from 'tabler-icons-react';

function ThemeToggler() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Group position="center" my={10}>
      <Switch
        onLabel={<Sun color={theme.colors.yellow[4]} size={18} />}
        offLabel={<MoonStars color={theme.colors.blue[6]} size={18} />}
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="md"
        color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
      />
    </Group>
  );
}
export default ThemeToggler;
