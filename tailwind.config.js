// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./Components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
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
        },

        // Custom category colors
        entertainment: "#8B5CF6",
        dining: "#F59E0B",
        health: "#10B981",
        subscriptions: "#6366F1",
        education: "#3B82F6",
        savings: "#16A34A",
        debt: "#EF4444",
        shopping: "#F472B6",
        travel: "#60A5FA",
        otherGray: "#9CA3AF",

        salary: "#34D399",
        freelance: "#60A5FA",
        investments: "#F59E0B",
        business: "#A78BFA",
        rental: "#F87171",
        refunds: "#6EE7B7",
        bonus: "#FBBF24",
        grants: "#93C5FD",
      },
    },
  },
  plugins: [],
};
