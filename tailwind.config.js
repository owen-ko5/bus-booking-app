/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",  
        accent: "#1e40af",    
        light: "#f9fafb",     
        dark: "#0f172a",     
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["'Poppins'", "sans-serif"],
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px) scale(1.1)" },
        },
        'slide-fade': {
          "0%": { transform: "translateX(0%)", opacity: "1" },
          "25%": { opacity: "0.6" },
          "50%": { transform: "translateX(-25%)", opacity: "1" },
          "75%": { opacity: "0.6" },
          "100%": { transform: "translateX(-50%)", opacity: "1" },
        },
        'dynamic-matatu': {
          '0%': {
            transform: 'translateX(0%) scale(1) rotate(0deg)',
            opacity: '1',
          },
          '25%': {
            transform: 'translateX(-12.5%) scale(1.05) rotate(1deg)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'translateX(-25%) scale(1) rotate(0deg)',
            opacity: '1',
          },
          '75%': {
            transform: 'translateX(-37.5%) scale(1.05) rotate(-1deg)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'translateX(-50%) scale(1) rotate(0deg)',
            opacity: '1',
          },
        },
        
        tilt: {
          "0%, 100%": { transform: "translateY(-4px) rotate(-1.5deg)" },
          "50%": { transform: "translateY(4px) rotate(1.5deg)" },
        },
      },
      animation: {
        slide: "slide 20s linear infinite",
        'fade-in': "fade-in 1s ease-out forwards",
        'bounce-slow': "bounceSlow 2s ease-in-out infinite",
        'slide-fade': "slide-fade 20s linear infinite",
        'dynamic-matatu': 'dynamic-matatu 24s linear infinite',
        
        tilt: "tilt 3s ease-in-out infinite",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0, 0, 0, 0.1)",
        deep: "0 8px 32px rgba(0, 0, 0, 0.15)",
        
        'blue-glow': "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)",
      },
      transitionTimingFunction: {
        'in-out-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
