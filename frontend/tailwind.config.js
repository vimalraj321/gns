/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#25273b", // Dark blue/slate
        secondary: "#4c65b9", // Royal blue
        accent: "#c44694", // Pink
        light: "#d5d8d8", // Light gray
        blue: "#7eb9cd", // Sky blue
        brown: "#7a6365", // Mauve/brown
        dark: "#25273b", // Same as primary for text
        success: "#10b981", // Green for success states
        warning: "#f59e0b", // Amber for warnings
        error: "#ef4444", // Red for errors
      },
    },
  },
  plugins: [],
};
