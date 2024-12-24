import { type PropsWithChildren } from 'react';
import { Header } from '~components';

export type FullscreenLayoutProps = PropsWithChildren;

export const FullscreenLayout = ({ children }: FullscreenLayoutProps) => (
  <div>
    <Header />
    <main className="container mx-auto p-5">{children}</main>
  </div>
);
