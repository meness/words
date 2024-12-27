import 'reflect-metadata';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { NextPage } from 'next';
import { DefaultSeo, OrganizationJsonLd } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { type ReactElement } from 'react';
import '~assets/css/theme.css';
import { GlobalErrorBoundary } from '~components';
import { appConfig, uiConfig } from '~configs';
import '~configs/database.config';
import { ThemeProvider } from '~providers';

const AppPage = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <DefaultSeo
        defaultTitle="تمرین کلمات انگلیسی حقوقی"
        titleTemplate="%s - تمرین کلمات انگلیسی حقوقی"
        description={appConfig.meta.description}
        openGraph={{
          locale: 'fa-IR',
          type: 'website',
          title: appConfig.meta.title,
          description: appConfig.meta.description,
          images: [
            {
              url: 'https://wwwords.ir/assets/images/metatag.jpg',
              alt: appConfig.meta.title,
              type: 'image/jpeg'
            }
          ]
        }}
        twitter={{
          site: 'wwwords_ir',
          cardType: 'summary_large_image'
        }}
      />
      <OrganizationJsonLd
        name={appConfig.meta.title}
        url="https://wwwords.ir"
        logo="https://wwwords.ir/favicon.svg"
        sameAs={['https://twitter.com/wwwords_ir']}
      />
      <Head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0"
        />
        <style>
          {`
              :root{
                --yekan-bakh: ${uiConfig.fonts.yekanBakh.style.fontFamily};
                --inter: ${uiConfig.fonts.inter.style.fontFamily};
              }
          `}
        </style>
      </Head>
      {getLayout(<Component {...pageProps} />)}
      <Analytics />
      <SpeedInsights />
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
