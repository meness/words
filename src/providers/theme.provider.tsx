'use client';

import { HeroUIProvider } from '@heroui/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { push } = useRouter();

  return (
    <HeroUIProvider
      navigate={push}
      locale="fa-IR">
      <NextThemesProvider
        defaultTheme="light"
        attribute="class"
        enableSystem>
        {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
};
