import { Avatar } from '@nextui-org/avatar';
import { Link } from '@nextui-org/link';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';
import { type PropsWithChildren } from 'react';

export type FullscreenLayoutProps = PropsWithChildren;

export const FullscreenLayout = ({ children }: FullscreenLayoutProps) => (
  <div>
    <Navbar
      isBordered
      position="static"
      classNames={{ base: 'select-none' }}
      maxWidth="full">
      <NavbarBrand className="flex items-center gap-2">
        <span className="text-4xl">👋</span>
        <p className="font-bold text-inherit">خوش آمدی!</p>
      </NavbarBrand>
      <NavbarContent
        as="div"
        justify="end">
        <Avatar
          as={Link}
          isBordered
          target="_blank"
          href="https://github.com/meness"
          className="transition-transform"
          color="default"
          name="Alex"
          size="sm"
          src="https://avatars.githubusercontent.com/u/7955356?v=4"
        />
      </NavbarContent>
    </Navbar>
    <main className="container mx-auto p-5">{children}</main>
  </div>
);
