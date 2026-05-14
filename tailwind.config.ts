import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Semantic palette (ghpgvn.vn Buddhist portal style) ──────────────
        saffron:   '#8B1A1A',   // primary accent  → Vietnamese Buddhist red
        ember:     '#C8960C',   // secondary accent → gold
        parchment: '#1C1C1C',   // foreground text  → near-black
        ink:       '#FEF8EE',   // page background  → warm cream
        bark:      '#E0D4C4',   // dividers/borders → warm stone
        ash:       '#7A6B5F',   // secondary text   → warm gray
        moss:      '#2D6A11',   // keep green
        // ── New explicit tokens ─────────────────────────────────────────────
        crimson:   '#5C0F0F',   // nav / footer / hero dark background
        ruby:      '#8B1A1A',   // hover red (alias for saffron)
        pearl:     '#F5EDE0',   // alternate section background
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-lora)', 'Georgia', 'serif'],
        ui: ['var(--font-be-vietnam)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'label': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
      spacing: {
        section: '6rem',
        component: '3rem',
        inner: '1.5rem',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.025'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up':  'fadeUp 0.9s ease forwards',
        'crossfade': 'crossfade 5s ease-in-out infinite',
        'spin-slow': 'spin 90s linear infinite',
        'float':    'float 8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        crossfade: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
      transitionDuration: { '900': '900ms' },
      boxShadow: {
        'card': '0 2px 12px rgba(92,15,15,0.08)',
        'card-hover': '0 6px 24px rgba(92,15,15,0.14)',
      },
    },
  },
  plugins: [],
}

export default config
