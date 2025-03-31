// tailwind.config.js
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: true, // Можно отключить, если используешь свой reset CSS
  },
  theme: {
    extend: {},
  },
  plugins: [],
}