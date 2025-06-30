import '~configs/database.config';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { twJoin } from 'tailwind-merge';
import { MainContainer } from '~components/main-container.component';
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

export const generateMetadata = async (): Promise<Metadata> => {
  const ogTitle = 'یادگیری سریع زبان انگلیسی و تمرین رایگان';
  const description =
    'سریع کلمات انگلیسی یاد بگیرید. کاملا رایگان آزمون بدهید و با تمرین آنلاین بهتر انگلیسی صحبت کنید';

  return {
    title: {
      default: 'یادگیری سریع زبان انگلیسی',
      template: '%s | انگلیسی سریع'
    },
    description,
    keywords: ['آموزش زبان انگلیسی', 'معنی کلمات', 'ترجمه کلمات', 'یادگیری سریع زبان انگلیسی'],
    openGraph: {
      locale: 'fa-IR',
      type: 'website',
      title: ogTitle,
      description,
      images: [
        { url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/metatag.jpg`, alt: ogTitle, type: 'image/jpeg' }
      ]
    },
    twitter: { site: 'wwwords_ir', card: 'summary_large_image' }
  };
};

export default AppLayout;
