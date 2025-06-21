const isProduction = process.env.NEXT_PUBLIC_APP_ENV === 'production';
const isStaging = process.env.NEXT_PUBLIC_APP_ENV === 'staging';
const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development';
const isProductionOrStaging = isProduction || isStaging;

export const envs = {
  isDevelopment,
  isProductionOrStaging,
  isProduction,
  isStaging
};
