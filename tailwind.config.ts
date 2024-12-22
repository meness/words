import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
    './node_modules/@nextui-org/theme/dist/components/(avatar|badge|button|card|chip|divider|dropdown|input|link|modal|navbar|pagination|progress|skeleton|snippet|spinner|toggle|table|ripple|menu|popover|form|checkbox|spacer).js'
  ],
  plugins: [
    nextui({
      defaultTheme: 'light'
    })
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'yekan-bakh': 'var(--yekan-bakh)'
      },
      fontSize: {
        '4.5xl': ['42px', '1'],
        '6.5xl': ['68px', '1'],
        '2.5xl': ['28px', '2rem']
      }
    }
  }
} satisfies Config;
