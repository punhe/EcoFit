const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Vintage/Retro color palette - More aged and worn
        vintage: {
          cream: '#F5EBE0',
          beige: '#E8D8C8',
          paper: '#DDD0C0',
          parchment: '#F0E6D8',
          brown: '#6B3A19',
          'brown-dark': '#3D2210',
          sepia: '#5C3317',
          gold: '#B8860B',
          'gold-light': '#DAA520',
          rust: '#8B3A3A',
          olive: '#4A5D23',
          teal: '#2F4F4F',
          burgundy: '#5C1A22',
          mustard: '#BE8800',
          coffee: '#4A3728',
          ink: '#1C1108',
          'faded-red': '#A45A52',
          worn: '#C4B09C',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Crimson Pro', 'Libre Baskerville', 'Georgia', 'serif'],
        accent: ['Old Standard TT', 'Cormorant Garamond', 'Georgia', 'serif'],
        typewriter: ['Special Elite', 'Courier New', 'monospace'],
        retro: ['Young Serif', 'Georgia', 'serif'],
        script: ['Yellowtail', 'cursive'],
      },
      boxShadow: {
        'vintage': '0 4px 20px rgba(60, 35, 15, 0.1)',
        'vintage-lg': '0 15px 40px rgba(60, 35, 15, 0.18)',
        'retro': '4px 4px 0 #C4B09C',
        'retro-hover': '6px 6px 0 #C4B09C',
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#F0E6D8",
            foreground: "#2C1810",
            primary: {
              50: "#F5EBE0",
              100: "#E8D8C8",
              200: "#DDD0C0",
              300: "#DAA520",
              400: "#B8860B",
              500: "#6B3A19",
              600: "#5C3317",
              700: "#3D2210",
              800: "#2C1810",
              900: "#1C1108",
              DEFAULT: "#6B3A19",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#B8860B",
              foreground: "#ffffff",
            },
            focus: "#B8860B",
            divider: "#C4B09C",
            content1: "#F5EBE0",
            content2: "#E8D8C8",
            content3: "#DDD0C0",
            content4: "#C4B09C",
          },
        },
      },
    }),
  ],
};
