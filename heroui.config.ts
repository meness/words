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
        background: {
          50: '#333333',
          100: '#2B2B2B',
          200: '#262626',
          300: '#212121',
          400: '#1D1D1D',
          500: '#1A1A1A',
          600: '#171717',
          700: '#141414',
          800: '#101010',
          900: '#0D0D0D',
          DEFAULT: '#1A1A1A',
          foreground: '#E0E0E0'
        },
        foreground: {
          100: '#F5F5F5',
          200: '#E0E0E0',
          300: '#B0B0B0',
          400: '#8C8C8C',
          500: '#666666',
          600: '#4D4D4D',
          700: '#333333',
          800: '#262626',
          900: '#1A1A1A',
          DEFAULT: '#E0E0E0',
          foreground: '#000000'
        },
        primary: {
          100: '#B3ECE0',
          200: '#80E0CB',
          300: '#4DCFB2',
          400: '#26B89B',
          500: '#009472',
          600: '#008060',
          700: '#006C50',
          800: '#00573F',
          900: '#004230',
          DEFAULT: '#009472',
          foreground: '#E0E0E0'
        },
        secondary: {
          50: '#E6E0F5',
          100: '#CFC3EB',
          200: '#A799D7',
          300: '#816BC3',
          400: '#5E3DAE',
          500: '#5536A0',
          600: '#4C3091',
          700: '#3F2876',
          800: '#311F5B',
          900: '#231640',
          DEFAULT: '#5E3DAE',
          foreground: '#ffffff'
        },
        warning: {
          100: '#FFF5B3',
          200: '#FFE880',
          300: '#FFDA4D',
          400: '#FFCB26',
          500: '#F5B800',
          600: '#D29A00',
          700: '#AF7D00',
          800: '#8C6100',
          900: '#734E00',
          DEFAULT: '#F5B800',
          foreground: '#000000'
        },
        danger: {
          100: '#F9C2C2',
          200: '#F39595',
          300: '#EA6565',
          400: '#E03F3F',
          500: '#C91B1B',
          600: '#AD1717',
          700: '#911313',
          800: '#750F0F',
          900: '#5F0C0C',
          DEFAULT: '#C91B1B',
          foreground: '#E0E0E0'
        },
        success: {
          100: '#D4F5D8',
          200: '#AEEAB6',
          300: '#86DB92',
          400: '#5FCA73',
          500: '#38B24F',
          600: '#2B9A41',
          700: '#1F8135',
          800: '#156829',
          900: '#0E541F',
          DEFAULT: '#38B24F',
          foreground: '#000000'
        }
      }
    }
  }
});
