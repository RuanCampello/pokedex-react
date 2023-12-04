import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'platinum': '#D9D9D9',
        'silver': '#CBCDCB',
        'ash-gray': '#BCC0BC'
      }
    },
  },
  plugins: [],
}
export default config
