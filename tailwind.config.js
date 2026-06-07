/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        espresso: { DEFAULT: "#1B0D0A", light: "#3C1F14" },
        /* Decorative terra (use on dark backgrounds or large text) */
        terra: { DEFAULT: "#C17A56", light: "#D4956F", dark: "#9A5E3E" },
        /* Accessible terra — 6.2:1 on cream (#F5EEE4). Use for text/icons on light bg */
        "terra-text": "#7D4B28",
        sand: { DEFAULT: "#D4B896", light: "#E8D5B7", dark: "#B89A74" },
        cream: { DEFAULT: "#F5EEE4", dark: "#EDE3D3" },
        sage: { DEFAULT: "#7A8C6E", light: "#9BAF8A", dark: "#5E6F55" },
        gold: { DEFAULT: "#C9A96E", light: "#DBBF88" },
        success: "#3D7A5E",
        warning: "#B8860B",
        danger: "#A93226",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      fontFamily: {
        sans:  ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 2px 12px 0 rgba(27,13,10,0.07), 0 1px 3px 0 rgba(27,13,10,0.04)",
        "card-hover": "0 12px 32px 0 rgba(27,13,10,0.13), 0 2px 8px 0 rgba(27,13,10,0.06)",
        glass: "0 4px 24px 0 rgba(27,13,10,0.10)",
      },
      keyframes: {
        "fade-up":   { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        "fade-in":   { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-in":  { from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } },
        "slide-out": { from: { transform: "translateX(0)" }, to: { transform: "translateX(100%)" } },
      },
      animation: {
        "fade-up":   "fade-up 0.6s ease-out forwards",
        "fade-in":   "fade-in 0.4s ease-out forwards",
        "slide-in":  "slide-in 0.35s ease-out",
        "slide-out": "slide-out 0.3s ease-in",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
