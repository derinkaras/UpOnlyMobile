/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./Components/**/*.{js,jsx,ts,tsx}"
  ],  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Add custom colors here
      colors: {
        primary: "#a3e635",
        primaryLight: "#0ea5e9",
        primaryDark: "#0369a1",
        text: "#fff",
        textLight: "#e5e5e5",
        textLighter: "#d4d4d4",
        white: "#fff",
        black: "#000",
        rose: "#ef4444",
        green: "#16a34a",
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          350: "#CCCCCC",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        }
      }
    },
  },
  plugins: [],
}