import { type PropsWithChildren } from 'react';
import { Footer } from '~components/footer.component';
import { Header } from '~components/header.component';

export const MainContainer = ({ children }: PropsWithChildren) => (
  <div className="flex min-h-svh flex-col">
    <Header />
    <main className="container mx-auto grow p-5">{children}</main>
    <Footer />
  </div>
);
