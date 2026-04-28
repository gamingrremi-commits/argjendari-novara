import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C9A961',
          light: '#E5C989',
          dark: '#9B7F3F',
        },
        ink: {
          DEFAULT: '#2A2520',
          black: '#0A0A0A',
          soft: '#161412',
        },
        pearl: {
          DEFAULT: '#F8F6F0',
          warm: '#EDE7D9',
        },
        line: 'rgba(201,169,97,0.18)',
      },
      fontFamily: {
        display: ['var(--font-italiana)', 'serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(56px, 9vw, 128px)', { lineHeight: '0.92', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(48px, 7vw, 96px)', { lineHeight: '0.95' }],
        'display-md': ['clamp(40px, 6vw, 80px)', { lineHeight: '1' }],
        'display-sm': ['clamp(40px, 5vw, 64px)', { lineHeight: '1' }],
      },
      letterSpacing: {
        widest: '0.3em',
        ultra: '0.4em',
      },
      animation: {
        'fade-up': 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1.5s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'scroll-pulse': 'scrollPulse 2s infinite',
        'marquee': 'marquee 40s linear infinite',
        'pulse-ring': 'pulseRing 2s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translate(-50%, -50%) translateY(0)' },
          '50%': { transform: 'translate(-50%, -50%) translateY(-20px)' },
        },
        scrollPulse: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 10px 40px rgba(37,211,102,0.4), 0 0 0 0 rgba(37,211,102,0.6)' },
          '70%': { boxShadow: '0 10px 40px rgba(37,211,102,0.4), 0 0 0 20px rgba(37,211,102,0)' },
          '100%': { boxShadow: '0 10px 40px rgba(37,211,102,0.4), 0 0 0 0 rgba(37,211,102,0)' },
        },
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
