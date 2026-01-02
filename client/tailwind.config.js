/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#6C4EFF",
          dark: "#4B2CCB",
          light: "#E9E4FF",
        },
        background: "#F5F5F7",
        text: {
          primary: "#1C1C1E",
          secondary: "#8E8E93",
        },
      },
      fontFamily: {
        inter: ["Inter_400Regular"], // default font name
      },
    },
  },
  plugins: [],
};
