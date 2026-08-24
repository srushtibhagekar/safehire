/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        primary: {
          DEFAULT: '#3B82F6', // Cobalt Indigo
          hover: '#2563EB',
          foreground: '#FFFFFF',
        },
        cyan: {
          DEFAULT: '#06B6D4',
          accent: '#22D3EE',
        },
        risk: {
          genuine: '#10B981', // Emerald Green
          caution: '#F59E0B', // Amber
          fraud: '#EF4444',   // Rose Red
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
};
