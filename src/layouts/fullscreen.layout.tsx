import { type PropsWithChildren } from 'react';

export type FullscreenLayoutProps = PropsWithChildren;

export const FullscreenLayout = ({ children }: FullscreenLayoutProps) => (
  <div className="grid min-h-svh grid-rows-[1fr]">
    <main className="container mx-auto p-5">{children}</main>
  </div>
);
