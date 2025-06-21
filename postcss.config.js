export default {
  plugins:
    process.env.NODE_ENV === 'production'
      ? [
          '@tailwindcss/postcss',
          [
            'cssnano',
            {
              preset: ['default', { discardComments: { removeAll: true } }]
            }
          ]
        ]
      : ['@tailwindcss/postcss']
};
