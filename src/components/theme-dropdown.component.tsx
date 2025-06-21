'use client';

import { Button } from '@heroui/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { useTheme } from 'next-themes';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { IoSunny } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { MdOutlineDarkMode } from 'react-icons/md';
import { useMounted } from '~hooks/use-mounted.hook';

type Theme = 'light' | 'dark' | 'system';

type ThemeDropdownItem = { id: Theme; icon: IconType };

const themeDropdownItems: ThemeDropdownItem[] = [
  { id: 'light', icon: IoSunny },
  { id: 'dark', icon: MdOutlineDarkMode },
  { id: 'system', icon: HiMiniComputerDesktop }
];

export const ThemeDropdown = () => {
  const mounted = useMounted();
  const { theme, setTheme, resolvedTheme } = useTheme();

  if (!mounted) {
    return null;
  }

  return (
    <Dropdown
      shouldBlockScroll={false}
      type="listbox"
      classNames={{ content: 'min-w-fit' }}>
      <DropdownTrigger>
        <Button
          type="button"
          isIconOnly
          variant="light">
          {resolvedTheme === 'light' && <IoSunny />}
          {resolvedTheme === 'dark' && <MdOutlineDarkMode />}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="تغییر ظاهر"
        selectionMode="single"
        hideSelectedIcon
        selectedKeys={theme ? [theme] : []}
        onAction={(key) => setTheme(String(key))}
        color="default"
        classNames={{ base: 'w-fit', list: 'w-fit' }}
        variant="faded">
        {themeDropdownItems.map(({ id, icon: Icon }) => (
          <DropdownItem key={id}>
            <Icon />
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
