import { type PropsWithChildren } from 'react';

export type FullscreenLayoutProps = PropsWithChildren;

export const FullscreenLayout = ({ children }: FullscreenLayoutProps) => (
  <main className="container mx-auto p-5">{children}</main>
);
