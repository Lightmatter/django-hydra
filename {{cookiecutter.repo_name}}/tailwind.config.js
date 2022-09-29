const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './frontend/**/*.html',
    './frontend/**/*.js',
    './frontend/**/*.css',
    './{{cookiecutter.repo_name}}/templates/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addVariant }) {
      // https://www.crocodile.dev/blog/css-transitions-with-tailwind-and-htmx
      addVariant('htmx-settling', ['&.htmx-settling', '.htmx-settling &']);
      addVariant('htmx-request',  ['&.htmx-request',  '.htmx-request &']);
      addVariant('htmx-swapping', ['&.htmx-swapping', '.htmx-swapping &']);
      addVariant('htmx-added',    ['&.htmx-added',    '.htmx-added &']);
    }),
    require('@tailwindcss/forms'),
  ],
}
