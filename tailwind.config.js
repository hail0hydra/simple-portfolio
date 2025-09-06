// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'text-red-500',
    'text-green-400',
    'text-yellow-400',
    'text-cyan-300',
    'text-blue-400',
    'text-purple-400',
    'text-white'
  ]
};

