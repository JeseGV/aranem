import { nextui } from "@nextui-org/react"
import { lightThemeColors, darkThemeColors } from "./styles/themeColors"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        gradient: "linear-gradient(153deg, rgba(218, 117, 196, 1) 0%, rgba(115, 39, 220, 1) 100%)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: lightThemeColors,
        },
        dark: {
          colors: darkThemeColors,
        },
      },
    }),
  ],
}
