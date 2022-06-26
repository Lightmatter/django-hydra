const plugin = require('tailwindcss/plugin');

module.exports = {
  corePlugins: {
    preflight: false,  //manually import this in app.css
  },
  content: [
    './frontend/**/*.html',
    './frontend/**/*.js',
    './frontend/**/*.css',
    './{{cookiecutter.repo_name}}/templates/**/*.html',
    ,'./{{cookiecutter.repo_name}}/templates/**/*.jinja',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D36A8',
          focus: '#00075e',
          content: '#ffffff'
        },
        secondary: {
          DEFAULT: '#D1D5DB',
          focus: '#e5e8ed',
          content: '#000000'
        },
        accent: {
          DEFAULT: '#111827',
          'focus': '#030509',
          'content': '#ffffff'
        },
        neutral: {
          '100': '#F3F6FA',
          '200': '#E5E7EB',
          '300': '#D1D5DB',
          '400': '#9CA3AF',
          '500': '#6B7280',
          '600': '#4B5563',
          '700': '#374151',
          '800': '#1F2937',
          '900': '#111827',
        },
        info: {
          DEFAULT: '#60a5fa',
          'focus': '#1e40af',
          'content': '#eff6ff'
        },
        success: {
          DEFAULT: '#4ade80',
          'focus': '#166534',
          'content':'#f0fdf4',
        },
        warning: {
          DEFAULT: '#FACC15',
          'focus': '#854D0E',
          'content': '#fefce8'
        },
        error: {
          DEFAULT: '#F87171',
          'focus': '#991b1b',
          'content': '#FEF2F2'
        },
      }
    },
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
