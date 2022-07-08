import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Head from "next/head";
import { queryClient } from "../src/fetcher/queryClient";
import { AppProps } from "next/app";
import { PropsWithChildren } from "react";
import useMeQuery from "../src/hooks/useMeQuery";
import LoginForm from "../src/components/LoginForm";
import { CssBaseline } from "@mui/material";
import Header from "../src/components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Auth>
          <Header />
          <Component {...pageProps} />
        </Auth>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

function Auth({ children }: PropsWithChildren<{}>) {
  const { me } = useMeQuery();

  if (me.status !== "success") {
    return <LoginForm />;
  }

  return <>{children}</>;
}
export default MyApp;
