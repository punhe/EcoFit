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
        // Vintage color palette
        vintage: {
          cream: '#FDF8F3',
          beige: '#F5E6D3',
          paper: '#EDE4D7',
          brown: '#8B4513',
          'brown-dark': '#5D3A1A',
          sepia: '#704214',
          gold: '#C4A35A',
          'gold-light': '#D4B87A',
          rust: '#A0522D',
          olive: '#556B2F',
          teal: '#2F4F4F',
          burgundy: '#722F37',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Lora', 'Georgia', 'serif'],
        accent: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        'vintage': '0 4px 20px rgba(139, 69, 19, 0.08)',
        'vintage-lg': '0 15px 40px rgba(139, 69, 19, 0.15)',
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FDF8F3",
            foreground: "#3D2914",
            primary: {
              50: "#FDF8F3",
              100: "#F5E6D3",
              200: "#EDE4D7",
              300: "#D4B87A",
              400: "#C4A35A",
              500: "#8B4513",
              600: "#704214",
              700: "#5D3A1A",
              800: "#3D2914",
              900: "#2D1F10",
              DEFAULT: "#8B4513",
              foreground: "#ffffff",
            },
            focus: "#C4A35A",
          },
        },
      },
    }),
  ],
};
