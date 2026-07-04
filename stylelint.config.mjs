/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-html/astro',
  ],
  ignoreFiles: ['.astro/**', '.yarn/**', 'dist/**', 'node_modules/**'],
  reportDescriptionlessDisables: true,
  reportInvalidScopeDisables: true,
  reportNeedlessDisables: true,
  rules: {
    'color-hex-length': 'long',
    'custom-property-empty-line-before': null,
    'custom-property-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
      { message: 'Use kebab-case for custom properties.' },
    ],
    'declaration-no-important': true,
    'keyframes-name-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
      { message: 'Use kebab-case for keyframe names.' },
    ],
    'max-nesting-depth': 3,
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
      { message: 'Use kebab-case or BEM: block, block__element, block--modifier.' },
    ],
    'selector-max-compound-selectors': 4,
    'selector-max-id': 0,
  },
};
