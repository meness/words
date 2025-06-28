import { heroui } from '@heroui/theme';

export default heroui({
  defaultTheme: 'light',
  themes: {
    light: {
      extend: 'light',
      colors: {
        background: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFFFF',
          500: '#FFFFFF',
          600: '#DBBABD',
          700: '#B7808A',
          800: '#935162',
          900: '#7A304A',
          DEFAULT: '#FFFFFF',
          foreground: '#000000'
        },
        foreground: {
          // 50: '',
          100: '#F4F4F4',
          200: '#EAEAEA',
          300: '#C1C1C1',
          400: '#848484',
          500: '#333333',
          600: '#2B2525',
          700: '#24191B',
          800: '#1D1013',
          900: '#18090E',
          DEFAULT: '#333333',
          foreground: '#ffffff'
        },
        primary: {
          // 50: '',
          100: '#C7F9DB',
          200: '#92F4C1',
          300: '#59DEA6',
          400: '#2FBE90',
          500: '#009472',
          600: '#007F6E',
          700: '#006A66',
          800: '#005055',
          900: '#003C47',
          DEFAULT: '#009472',
          foreground: '#ffffff'
        },
        secondary: {
          DEFAULT: '#5e3dae',
          foreground: '#ffffff',
          50: '#ece7f5',
          100: '#d9cfeb',
          200: '#b39fd7',
          300: '#8e6fc3',
          400: '#683faf',
          500: '#5e3dae',
          600: '#54369b',
          700: '#432b7c',
          800: '#32205c',
          900: '#21153d'
        },
        warning: {
          // 50: '',
          100: '#FEF8CB',
          200: '#FEF098',
          300: '#FEE565',
          400: '#FDDA3F',
          500: '#FCC900',
          600: '#D8A800',
          700: '#B58900',
          800: '#926B00',
          900: '#785600',
          DEFAULT: '#FCC900',
          foreground: '#000000'
        },
        danger: {
          // 50: '',
          100: '#FDE1D3',
          200: '#FBBCA8',
          300: '#F38D7B',
          400: '#E76159',
          500: '#D8272C',
          600: '#B91C2E',
          700: '#9B132F',
          800: '#7D0C2D',
          900: '#67072C',
          DEFAULT: '#D8272C',
          foreground: '#ffffff'
        },
        success: {
          // 50: '',
          100: '#E9FBD4',
          200: '#CFF8AB',
          300: '#A9EB7E',
          400: '#83D85A',
          500: '#50BF2B',
          600: '#37A41F',
          700: '#228915',
          800: '#116E0D',
          900: '#085B0A',
          DEFAULT: '#50BF2B',
          foreground: '#000000'
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
