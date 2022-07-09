import { PropsWithChildren } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '../src/components/Layout';
import LoginForm from '../src/components/LoginForm';
import { queryClient } from '../src/fetcher/queryClient';
import useMeQuery from '../src/hooks/useMeQuery';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          fontFamily: 'Roboto, sans-serif',
          loader: 'bars',
        }}
      >
        <QueryClientProvider client={queryClient}>
          <Auth>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Auth>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </MantineProvider>
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
