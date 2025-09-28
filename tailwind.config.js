/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.3", filter: "blur(24px)" },
          "50%": { opacity: "0.7", filter: "blur(28px)" },
        },
        slowSpin: { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
        slowSpin: "slowSpin 40s linear infinite",
      },
    },
  },
  plugins: [],
}
