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
        // Discord-inspired dark theme colors
        "discord-dark": "#0d1117",
        "discord-darker": "#080b0f",
        "discord-card": "#161b22",
        "discord-card-hover": "#1c2129",
        "discord-border": "#30363d",
        "discord-border-light": "#484f58",

        // Discord Blurple spectrum
        "blurple": "#5865F2",
        "blurple-dark": "#4752C4",
        "blurple-light": "#7289DA",
        "blurple-soft": "#8EA1E1",

        // Accent colors (Discord-style)
        "discord-green": "#3BA55C",
        "discord-green-light": "#57F287",
        "discord-red": "#ED4245",
        "discord-red-light": "#F47067",
        "discord-yellow": "#FEE75C",
        "discord-fuchsia": "#EB459E",
        "discord-cyan": "#00AFF4",

        // Text colors
        "discord-text": "#DCDDDE",
        "discord-text-muted": "#8B949E",
        "discord-text-faint": "#6E7681",

        // Legacy mappings for compatibility
        bg: "#0d1117",
        "bg-elevated": "#161b22",
        "neon-violet": "#5865F2",
        "neon-violet-soft": "#7289DA",
        "neon-red": "#F47067",
        "neon-red-strong": "#ED4245",
        "neon-cyan": "#00AFF4",
      },
      boxShadow: {
        "discord-glow": "0 0 20px rgba(88, 101, 242, 0.4)",
        "discord-glow-strong": "0 0 30px rgba(88, 101, 242, 0.6)",
        "discord-green-glow": "0 0 20px rgba(59, 165, 92, 0.5)",
        "discord-red-glow": "0 0 20px rgba(237, 66, 69, 0.5)",
        "discord-card": "0 8px 32px rgba(0, 0, 0, 0.4)",
        "discord-elevated": "0 4px 16px rgba(0, 0, 0, 0.3)",
        // Legacy mappings
        "neon-violet": "0 0 20px rgba(88, 101, 242, 0.5)",
        "neon-red": "0 0 18px rgba(237, 66, 69, 0.6)",
        "neon-soft": "0 0 24px rgba(114, 137, 218, 0.4)",
      },
      fontFamily: {
        sans: ["'gg sans'", "'Noto Sans'", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "discord-gradient": "linear-gradient(135deg, #5865F2 0%, #EB459E 100%)",
        "discord-gradient-subtle": "linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(235, 69, 158, 0.15) 100%)",
        "blurple-gradient": "linear-gradient(135deg, #4752C4 0%, #5865F2 50%, #7289DA 100%)",
        "blurple-gradient-horizontal": "linear-gradient(90deg, #4752C4 0%, #5865F2 50%, #7289DA 100%)",
        "card-gradient": "linear-gradient(180deg, #1c2129 0%, #161b22 100%)",
        "success-gradient": "linear-gradient(135deg, #3BA55C 0%, #57F287 100%)",
        "error-gradient": "linear-gradient(135deg, #ED4245 0%, #F47067 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(88, 101, 242, 0.4)" },
          "100%": { boxShadow: "0 0 30px rgba(88, 101, 242, 0.7)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};