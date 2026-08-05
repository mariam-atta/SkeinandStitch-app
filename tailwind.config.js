/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '380px',
      ...require('tailwindcss/defaultTheme').screens,
    },
    extend: {
      colors: {
        cream: {
          0: "#FFFDF9",
          50: "#F8F5EF",
          100: "#F3EEE6",
        },
        oat: {
          50: "#F5F0E8",
          100: "#ECE4D8",
        },
        ink: {
          900: "#1F1C1A",
          800: "#3A342F",
        },
        juniper: {
          700: "#405848",
          800: "#314537",
        },
        clay: {
          500: "#C86C4D",
          600: "#B5583A",
        },
        gold: {
          400: "#CBA35C",
        },
        stone: {
          100: "#EFE8DD",
          200: "#DDD1BF",
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-work-sans)', 'sans-serif'],
      },
      boxShadow: {
        soft: "0 12px 40px rgba(0,0,0,.08)",
        card: "0 20px 60px rgba(0,0,0,.12)",
      },
      borderRadius: {
        xl: "18px",
        "2xl": "28px",
      },
      keyframes: {
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        fadeUp: "fadeUp .8s ease forwards",
      },
    },
  },
  plugins: [],
};