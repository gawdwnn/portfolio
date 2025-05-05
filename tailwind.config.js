/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Color palette & gradients
      colors: {
        primary: '#4f46e5',       // Indigo 600
        secondary: '#ec4899',     // Pink 500
        accent: '#10b981',        // Green 500
        gradientFrom: '#a5b4fc',
        gradientTo: '#c084fc',
        neutral: {
          100: '#f5f5f5',
          900: '#1a202c',
        },
      },
      backgroundImage: theme => ({
        'hero-gradient': `linear-gradient(135deg, ${theme('colors.gradientFrom')}, ${theme('colors.gradientTo')})`,
      }),
      // Typography
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular'],
      },
      // Motion settings
      transitionDuration: {
        fast: '200ms',
        medium: '400ms',
        slow: '600ms',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
