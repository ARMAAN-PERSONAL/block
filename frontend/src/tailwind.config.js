/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
    "./src/lib/*.{js,ts,jsx,tsx}",
    "./src/config/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#05010a",
        "bg-elevated": "#13041f",
        "neon-violet": "#7c3aed",
        "neon-violet-soft": "#a855f7",
        "neon-red": "#f97373",
        "neon-red-strong": "#f43f5e",
        "neon-cyan": "#22d3ee",
      },
      boxShadow: {
        "neon-violet": "0 0 18px rgba(124, 58, 237, 0.8)",
        "neon-red": "0 0 18px rgba(244, 63, 94, 0.8)",
        "neon-soft": "0 0 24px rgba(168, 85, 247, 0.5)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};
