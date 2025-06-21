import '~configs/database.config';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { twJoin } from 'tailwind-merge';
import { MainContainer } from '~components/main-container.component';
import { app } from '~configs/app.config';
import { ui } from '~configs/ui.config';
import { ThemeProvider } from '~providers/theme.provider';

const AppLayout = ({ children }: PropsWithChildren) => (
  <html
    suppressHydrationWarning
    dir="rtl"
    lang="fa-IR"
    className={twJoin(ui.fonts.yekanBakh.variable, ui.fonts.inter.variable)}>
    <body>
      <ThemeProvider>
        {/* <OrganizationJsonLd
          name={appConfig.meta.title}
          url="https://wwwords.ir"
          logo="https://wwwords.ir/favicon.svg"
          sameAs={['https://twitter.com/wwwords_ir']}
        /> */}
        <MainContainer>{children}</MainContainer>
      </ThemeProvider>
      <Analytics
        debug={false}
        mode="production"
      />
      <SpeedInsights debug={false} />
    </body>
  </html>
);

export const metadata: Metadata = {
  title: {
    default: 'تمرین کلمات انگلیسی حقوقی',
    template: '%s - تمرین کلمات انگلیسی حقوقی'
  },
  description: app.meta.description,
  openGraph: {
    locale: 'fa-IR',
    type: 'website',
    title: app.meta.title,
    description: app.meta.description,
    images: [{ url: 'https://wwwords.ir/assets/images/metatag.jpg', alt: app.meta.title, type: 'image/jpeg' }]
  },
  twitter: { site: 'wwwords_ir', card: 'summary_large_image' }
};

export default AppLayout;
