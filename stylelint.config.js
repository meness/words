/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
          'source',
          'custom-variant',
          'document',
          'theme',
          'utility',
          'plugin'
        ]
      }
    ],
    'at-rule-no-deprecated': [
      true,
      {
        ignoreAtRules: ['apply']
      }
    ],
    'function-no-unknown': [true, { ignoreFunctions: ['theme'] }],
    'selector-class-pattern': null
  }
};
