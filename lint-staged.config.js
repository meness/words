export default {
  '*.css': ['stylelint --fix', 'prettier --write'],
  '*.{ts,tsx,js,json,yml}': [
    'eslint --cache',
    'prettier --check'
  ],
  '*.{md,svg}': ['prettier --check']
};
