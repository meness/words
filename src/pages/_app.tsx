import 'reflect-metadata';

import type { NextPage } from 'next';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { type ReactElement } from 'react';
import '~assets/css/theme.css';
import { GlobalErrorBoundary } from '~components';
import { uiConfig } from '~configs';
import { ThemeProvider } from '~providers';

const AppPage = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <DefaultSeo
        defaultTitle="تمرین کلمات"
        titleTemplate="%s - تمرین کلمات"
        description="تمرین کلمات انگلیسی با محوریت حقوقی"
        openGraph={{
          locale: 'fa-IR',
          title: 'تمرین کلمات',
          description: 'تمرین کلمات انگلیسی با محوریت حقوقی',
          images: []
        }}
      />
      <Head>
        <link
          rel="icon shortcut"
          href="/favicon.ico"
          type="image/x-icon"
          sizes="any"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
        />
        <style>
          {`
              :root{
                --yekan-bakh: ${uiConfig.fonts.yekanBakh.style.fontFamily};
              }
          `}
        </style>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
};

const AppPageWrapper = (props: AppPropsWithLayout) => (
  <GlobalErrorBoundary>
    <ThemeProvider>
      <AppPage {...props} />
    </ThemeProvider>
  </GlobalErrorBoundary>
);

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default AppPageWrapper;
