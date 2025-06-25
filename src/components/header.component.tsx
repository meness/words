'use client';

import { Avatar } from '@heroui/avatar';
import { Button, ButtonGroup } from '@heroui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Link } from '@heroui/link';
import { useDisclosure } from '@heroui/modal';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@heroui/navbar';
import { Skeleton } from '@heroui/skeleton';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { HiCurrencyDollar } from 'react-icons/hi2';
import { ImMobile } from 'react-icons/im';
import { IoStatsChart } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { MdChecklist } from 'react-icons/md';
import { PiExam } from 'react-icons/pi';
import { RiEnglishInput } from 'react-icons/ri';
import { examOption } from '~common/consts/exam-option.const';
import { EXAM_TYPE } from '~common/enums/exam-type.enum';
import { useWords } from '~hooks/use-words.hook';
import { Logo } from './logo.component';

const ThemeDropdown = dynamic(() => import('./theme-dropdown.component').then((module) => module.ThemeDropdown), {
  ssr: false
});

const ExamModal = dynamic(() => import('./exam-modal.component').then((module) => module.ExamModal), { ssr: false });

type FeaturesDropdownItem = { id: string; icon: IconType; description: string; label: string };

const featuresDropdownItems: FeaturesDropdownItem[] = [
  { id: 'words', icon: RiEnglishInput, description: 'تعداد کلمات به زودی افزایش می‌یابد.', label: '۵۱۷ کلمه' },
  { id: 'training', icon: MdChecklist, description: 'کلمات را به ۳ روش ساده تمرین کنید.', label: 'تمرین کلمات' },
  { id: 'exams', icon: PiExam, description: 'به ۲ روش از خود آزمون بگیرید.', label: 'آزمون' },
  {
    id: 'free',
    icon: HiCurrencyDollar,
    description: 'تمام قابلیت‌ها رایگان در اختیار شما قرار دارد.',
    label: 'کاملا رایگان'
  },
  {
    id: 'stats',
    icon: IoStatsChart,
    description: 'وضعیت پیشرفت خود را پس از هر آزمون مشاهده کنید.',
    label: 'آمار'
  },
  { id: 'design', icon: ImMobile, description: 'حتی با تلفن همراه تجربه خوبی خواهید داشت.', label: 'طراحی واکنش‌گرا' }
];

const FeaturesItem = () => {
  const { isOpen: isDropdownOpen, onOpenChange: onDropdownOpenChange } = useDisclosure({ defaultOpen: false });

  return (
    <Dropdown
      shouldBlockScroll={false}
      onOpenChange={onDropdownOpenChange}>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            disableRipple
            className="bg-transparent p-0 data-[hover=true]:bg-transparent"
            endContent={
              <motion.div
                initial={false}
                animate={{
                  rotate: isDropdownOpen ? 180 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}>
                <FaChevronDown />
              </motion.div>
            }
            radius="sm"
            variant="light">
            قابلیت‌های ابزار را بشناسید
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="ACME features"
        className="w-[340px]"
        hideSelectedIcon
        itemClasses={{
          base: 'gap-4'
        }}>
        {featuresDropdownItems.map(({ id, icon: Icon, description, label }) => (
          <DropdownItem
            key={id}
            startContent={<Icon className="shrink-0" />}
            description={description}>
            {label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export const Header = () => {
  const [selectedExamOption, setSelectedExamOption] = useState<[EXAM_TYPE]>([EXAM_TYPE.MEANING]);
  const { isOpen: isMenuOpen, onOpenChange: onMenuOpenChange } = useDisclosure({ defaultOpen: false });
  const {
    isOpen: isExamModalOpen,
    onClose,
    onOpenChange: onExamModalOpenChange
  } = useDisclosure({ defaultOpen: false });
  const { isLoading, data: words } = useWords();

  return (
    <Navbar
      isBordered
      position="static"
      classNames={{ base: 'select-none' }}
      maxWidth="full"
      onMenuOpenChange={onMenuOpenChange}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'منوی بسته شود' : 'منوی باز شود'}
        className="sm:hidden"
      />
      <NavbarBrand className="flex items-center gap-2">
        <Link href="/">
          <Logo width={50} />
        </Link>
      </NavbarBrand>
      <NavbarContent
        justify="center"
        className="hidden sm:flex">
        <FeaturesItem />
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <FeaturesItem />
        </NavbarMenuItem>
      </NavbarMenu>
      <NavbarContent justify="end">
        <Skeleton
          isLoaded={!isLoading}
          classNames={{ content: 'w-fit', base: 'rounded-large w-fit before:w-fit' }}>
          <ButtonGroup
            variant="flat"
            isDisabled={isLoading}
            color="primary">
            <Button
              onPress={onExamModalOpenChange}
              className="w-full sm:w-full">
              آزمون&nbsp;{examOption[selectedExamOption[0]].label}
            </Button>
            <Dropdown
              shouldBlockScroll={false}
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
                selectedKeys={selectedExamOption}
                selectionMode="single"
                onSelectionChange={(key) => {
                  setSelectedExamOption([key.currentKey as EXAM_TYPE]);
                }}>
                {Object.entries(examOption).map(([key, { description, label }]) => (
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
        <ThemeDropdown />
      </NavbarContent>
      <ExamModal
        isOpen={isExamModalOpen}
        onClose={onClose}
        words={words}
        examType={selectedExamOption[0]}
      />
    </Navbar>
  );
};
