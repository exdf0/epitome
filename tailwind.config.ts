import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'bg-primary': '#0a0a0f',
        'bg-secondary': '#12121a',
        'bg-tertiary': '#1a1a24',
        'bg-hover': '#22222e',

        // Border
        'border-primary': '#2a2a3a',
        'border-secondary': '#3a3a4a',

        // Text colors
        'text-primary': '#f0f0f5',
        'text-secondary': '#8888a0',
        'text-muted': '#5a5a70',

        // Accent colors
        'accent-primary': '#6366f1',
        'accent-secondary': '#8b5cf6',
        'accent-hover': '#818cf8',

        // Rarity colors
        'rarity-common': '#9ca3af',
        'rarity-uncommon': '#22c55e',
        'rarity-rare': '#3b82f6',
        'rarity-epic': '#a855f7',
        'rarity-legendary': '#f59e0b',
        'rarity-mythic': '#ef4444',

        // Class colors
        'class-warrior': '#dc2626',
        'class-ninja': '#16a34a',
        'class-shaman': '#2563eb',
        'class-necromancer': '#7c3aed',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
