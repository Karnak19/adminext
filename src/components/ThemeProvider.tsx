import { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { ColorScheme, ColorSchemeProvider } from '@mantine/core';

function ThemeProvider({
  children,
  colorScheme,
  setColorScheme,
}: PropsWithChildren<{
  colorScheme: ColorScheme;
  setColorScheme: Dispatch<SetStateAction<ColorScheme>>;
}>) {
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      {children}
    </ColorSchemeProvider>
  );
}

export default ThemeProvider;
