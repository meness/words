import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';
import { Skeleton } from '@nextui-org/skeleton';
import Link from 'next/link';
import { useWords } from '~hooks';
import { ExamModal } from './exam-modal.component';
import { Logo } from './logo.component';

export const Header = () => {
  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const { isLoading, data: words } = useWords();

  return (
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
        <Skeleton
          isLoaded={!isLoading}
          classNames={{ content: 'w-fit', base: 'rounded-large w-fit before:w-fit' }}>
          <Button
            type="button"
            color="primary"
            variant="bordered"
            onPress={onOpenChange}>
            آزمون
          </Button>
        </Skeleton>
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
      <ExamModal
        isOpen={isOpen}
        onClose={onClose}
        words={words}
      />
    </Navbar>
  );
};
