import { Avatar } from '@nextui-org/avatar';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';
import Link from 'next/link';
import { Logo } from './logo.component';

export const Header = () => (
  <Navbar
    isBordered
    position="static"
    classNames={{ base: 'select-none' }}
    maxWidth="full">
    <NavbarBrand className="flex items-center gap-2">
      <Logo width={50} />
      خوش آمدی!
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
);
