import { heroui } from '@heroui/theme';

export default heroui({
  defaultTheme: 'light',
  themes: {
    light: {
      extend: 'light',
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
        }
      }
    },
    dark: {
      extend: 'dark',
      colors: {
        background: '#1a1a1a',
        foreground: '#f5f5f5',
        focus: '#f7c544',
        primary: {
          50: '#008080',
          100: '#1a8d8d',
          200: '#339999',
          300: '#4da6a6',
          400: '#66b3b3',
          500: '#80c0c0',
          600: '#99cccc',
          700: '#b3d9d9',
          800: '#cce6e6',
          900: '#e6f2f2',
          DEFAULT: '#008080',
          foreground: '#f5f5f5'
        },
        secondary: {
          50: '#a8d5ba',
          100: '#b1d9c1',
          200: '#b9ddc8',
          300: '#c2e2cf',
          400: '#cbe6d6',
          500: '#d4eadd',
          600: '#dceee3',
          700: '#e5f2ea',
          800: '#eef7f1',
          900: '#f6fbf8',
          DEFAULT: '#a8d5ba',
          foreground: '#f5f5f5'
        }
      }
    }
  }
});
