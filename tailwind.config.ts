import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
    './node_modules/@nextui-org/theme/dist/components/(alert|avatar|badge|button|card|chip|divider|dropdown|image|input|link|modal|navbar|pagination|progress|radio|skeleton|snippet|spinner|toggle|table|tabs|ripple|menu|popover|form|checkbox|spacer).js'
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
        'yekan-bakh': 'var(--yekan-bakh)',
        inter: 'var(--inter)'
      },
      fontSize: {
        '4.5xl': ['42px', '1'],
        '6.5xl': ['68px', '1'],
        '2.5xl': ['28px', '2rem']
      },
      colors: {
        background: '#ffffff',
        foreground: '#333333',
        focus: '#f7c544',
        primary: {
          50: '#008080',
          100: '#007373',
          200: '#006666',
          300: '#005a5a',
          400: '#004d4d',
          500: '#004040',
          600: '#003333',
          700: '#002626',
          800: '#001a1a',
          900: '#000d0d',
          DEFAULT: '#008080',
          foreground: '#ffffff'
        },
        secondary: {
          50: '#a8d5ba',
          100: '#97c0a7',
          200: '#86aa95',
          300: '#769582',
          400: '#658070',
          500: '#546b5d',
          600: '#43554a',
          700: '#324038',
          800: '#222b25',
          900: '#111513',
          DEFAULT: '#a8d5ba',
          foreground: '#ffffff'
        },
        accent: {
          50: '#e74c3c',
          100: '#d04436',
          200: '#b93d30',
          300: '#a2352a',
          400: '#8b2e24',
          500: '#74261e',
          600: '#5c1e18',
          700: '#451712',
          800: '#2e0f0c',
          900: '#170806',
          DEFAULT: '#d04436',
          foreground: '#ffffff'
        }
      }
    }
  }
} satisfies Config;
