import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { SessionProvider, useSession } from "next-auth/react";
import { queryClient } from "../src/fetcher";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <Auth>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Auth>
      </SessionProvider>
    </>
  );
}

function Auth({ children }) {
  const { status } = useSession({ required: true });

  if (status === "authenticated") {
    return children;
  }

  return null;
}
export default MyApp;
