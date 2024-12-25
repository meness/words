import { Avatar } from '@nextui-org/avatar';
import { Button, ButtonGroup } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Link } from '@nextui-org/link';
import { useDisclosure } from '@nextui-org/modal';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/navbar';
import { Skeleton } from '@nextui-org/skeleton';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { HiCurrencyDollar } from 'react-icons/hi2';
import { ImMobile } from 'react-icons/im';
import { IoStatsChart } from 'react-icons/io5';
import { MdChecklist } from 'react-icons/md';
import { PiExam } from 'react-icons/pi';
import { RiEnglishInput } from 'react-icons/ri';
import { examOptions } from '~common/consts';
import { EXAM_TYPE } from '~common/enums';
import { useWords } from '~hooks';
import { ExamModal } from './exam-modal.component';
import { Logo } from './logo.component';

const FeaturesItem = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Dropdown
      shouldBlockScroll={false}
      onOpenChange={setIsDropdownOpen}>
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
        <DropdownItem
          key="training"
          startContent={<RiEnglishInput className="shrink-0" />}
          description="تعداد کلمات به زودی افزایش می‌یابد.">
          ۵۱۷ کلمه
        </DropdownItem>
        <DropdownItem
          key="training"
          startContent={<MdChecklist className="shrink-0" />}
          description="کلمات را به ۳ روش ساده تمرین کنید.">
          تمرین کلمات
        </DropdownItem>
        <DropdownItem
          key="exams"
          startContent={<PiExam className="shrink-0" />}
          description="به ۲ روش از خود آزمون بگیرید.">
          آزمون
        </DropdownItem>
        <DropdownItem
          key="free"
          startContent={<HiCurrencyDollar className="shrink-0" />}
          description="تمام قابلیت‌ها رایگان در اختیار شما قرار دارد.">
          کاملا رایگان
        </DropdownItem>
        <DropdownItem
          key="stats"
          startContent={<IoStatsChart className="shrink-0" />}
          description="وضعیت پیشرفت خود را حتی پس از هر آزمون مشاهده کنید.">
          آمار
        </DropdownItem>
        <DropdownItem
          key="design"
          startContent={<ImMobile className="shrink-0" />}
          description="حتی با تلفن همراه تجربه خوبی خواهید داشت.">
          طراحی واکنش‌گرا
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export const Header = () => {
  const [examOption, setExamOption] = useState<[EXAM_TYPE]>([EXAM_TYPE.MEANING]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const { isLoading, data: words } = useWords();

  return (
    <Navbar
      isBordered
      position="static"
      classNames={{ base: 'select-none' }}
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'منوی بسته شود' : 'منوی باز شود'}
        className="sm:hidden"
      />
      <NavbarBrand className="flex items-center gap-2">
        <Logo width={50} />
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
              onPress={onOpenChange}
              className="w-full sm:w-full">
              آزمون&nbsp;{examOptions[examOption[0]].label}
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
