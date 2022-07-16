import { PropsWithChildren } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ColorScheme, MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { queryClient } from '../src/app/queryClient';
import Layout from '../src/components/Layout';
import ThemeProvider from '../src/components/ThemeProvider';
import LoginForm from '../src/features/auth/LoginForm';
import useMeQuery from '../src/features/auth/useMeQuery';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'dark',
  });

  return (
    <>
      <Head>
        <title>Origins Admin</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider colorScheme={colorScheme} setColorScheme={setColorScheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            fontFamily: 'Roboto, sans-serif',
            loader: 'bars',
          }}
        >
          <NotificationsProvider>
            <QueryClientProvider client={queryClient}>
              <Auth>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </Auth>
              <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
            </QueryClientProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ThemeProvider>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types
function Auth({ children }: PropsWithChildren<{}>) {
  const { me } = useMeQuery();

  if (me.status !== 'success') {
    return <LoginForm />;
  }

  return <>{children}</>;
}
export default MyApp;
