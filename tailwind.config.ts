import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height: {
        'screen-1/2': '50vh',
        'screen-1/3': '33.333333vh',
      },
      margin: {
        'screen-1/2': '50vh',
        'screen-1/3': '33.333333vh',
        'screen-42': '42vh',
      }
    },
  },
  plugins: [],
}
export default config
