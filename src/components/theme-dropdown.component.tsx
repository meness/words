import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HiMiniComputerDesktop } from 'react-icons/hi2';
import { IoSunny } from 'react-icons/io5';
import { MdOutlineDarkMode } from 'react-icons/md';

export const ThemeDropdown = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <DropdownItem key="light">
          <IoSunny />
        </DropdownItem>
        <DropdownItem key="dark">
          <MdOutlineDarkMode />
        </DropdownItem>
        <DropdownItem key="system">
          <HiMiniComputerDesktop />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
