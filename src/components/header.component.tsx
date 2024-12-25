import { Avatar } from '@nextui-org/avatar';
import { Button, ButtonGroup } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { useDisclosure } from '@nextui-org/modal';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';
import { Skeleton } from '@nextui-org/skeleton';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { examOptions } from '~common/consts';
import { EXAM_TYPE } from '~common/enums';
import { useWords } from '~hooks';
import { ExamModal } from './exam-modal.component';
import { Logo } from './logo.component';

export const Header = () => {
  const [examOption, setExamOption] = useState<[EXAM_TYPE]>([EXAM_TYPE.MEANING]);
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
          <ButtonGroup
            variant="flat"
            isDisabled={isLoading}
            color="primary">
            <Button
              onPress={onOpenChange}
              className="w-full sm:w-full">
              آزمون&nbsp;{examOptions[examOption[0]].label}
            </Button>
            <Dropdown
              placement="bottom-end"
              classNames={{ base: 'select-none' }}>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="flat">
                  <FaChevronDown />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="گزینه‌های آزمون"
                className="max-w-[300px]"
                selectedKeys={examOption}
                selectionMode="single"
                onSelectionChange={(key) => {
                  setExamOption([key.currentKey as EXAM_TYPE]);
                }}>
                {Object.entries(examOptions).map(([key, { description, label }]) => (
                  <DropdownItem
                    key={key}
                    description={description}>
                    {label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </ButtonGroup>
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
        examType={examOption[0]}
      />
    </Navbar>
  );
};
