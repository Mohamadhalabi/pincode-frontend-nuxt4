
import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#F97316',
          dark: '#EA580C',
          body: "#ffffff"
        }
      }
    }
  }
}
