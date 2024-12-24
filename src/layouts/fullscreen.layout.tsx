import { type PropsWithChildren } from 'react';
import { Footer, Header } from '~components';

export type FullscreenLayoutProps = PropsWithChildren;

export const FullscreenLayout = ({ children }: FullscreenLayoutProps) => (
  <div className="flex min-h-svh flex-col">
    <Header />
    <main className="container mx-auto grow p-5">{children}</main>
    <Footer />
  </div>
);
