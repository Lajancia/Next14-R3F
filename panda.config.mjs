import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  conditions: {
    light: '[data-color-mode=light] &',
    dark: '[data-color-mode=dark] &',
  },
  // Useful for theme customization
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          background: { value: { base: '#E9E9E9', _dark: '#1e1e1e' } },
          MainText: { value: { base: '#1e1e1e', _dark: '#E9E9E9' } },
          primary: { value: { base: '#07c', _dark: '#0cf' } },
        },
      },
    },
  },
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'styled-system',
})
