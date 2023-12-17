import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        'pokedex': '370px'
      },
      height: {
        'pokedex': '750px'
      },
      colors: {
        'platinum': '#D9D9D9',
        'silver': '#CBCDCB',
        'ash-gray': '#BCC0BC'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
export default config
