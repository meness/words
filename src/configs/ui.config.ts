import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

const yekanBakhFont = localFont({
  variable: '--nextjs-font-yekan-bakh',
  src: [{ path: '../../public/assets/fonts/yekan-bakh-variable.ttf', style: 'normal', weight: '400' }]
});

const interFont = Inter({
  variable: '--nextjs-font-inter',
  weight: ['400', '700'],
  subsets: ['latin']
});

export const ui = {
  fonts: {
    yekanBakh: yekanBakhFont,
    inter: interFont
  }
};
