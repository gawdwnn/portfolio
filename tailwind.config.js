/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Color palette & gradients
      colors: {
        // HSL fallbacks for better browser compatibility
        primary: {
          DEFAULT: "hsl(258, 90%, 66%)", // Fallback
          modern: "#4f46e5", // OKLCH fallback will be applied via CSS
        },
        secondary: {
          DEFAULT: "hsl(328, 85%, 64%)", // Fallback
          modern: "#ec4899",
        },
        accent: {
          DEFAULT: "hsl(158, 64%, 52%)", // Fallback
          modern: "#10b981",
        },
        gradientFrom: {
          DEFAULT: "hsl(229, 84%, 81%)", // Fallback
          modern: "#a5b4fc",
        },
        gradientTo: {
          DEFAULT: "hsl(290, 85%, 77%)", // Fallback
          modern: "#c084fc",
        },
        neutral: {
          100: "#f5f5f5",
          900: "#1a202c",
        },
      },
      backgroundImage: (theme) => ({
        // Using HSL for better compatibility
        "hero-gradient": `linear-gradient(135deg, hsl(229, 84%, 81%), hsl(290, 85%, 77%))`,
        // Modern browsers will get the OKLCH version via CSS custom properties
        "hero-gradient-modern": `linear-gradient(135deg, ${theme(
          "colors.gradientFrom.modern"
        )}, ${theme("colors.gradientTo.modern")})`,
      }),
      // Typography
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
      },
      // Motion settings
      transitionDuration: {
        fast: "200ms",
        medium: "400ms",
        slow: "600ms",
      },
      transitionTimingFunction: {
        "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
