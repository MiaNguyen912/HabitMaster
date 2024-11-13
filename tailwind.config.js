/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        "primary": "#613EEA", // purple
        "primary-dark": "#3912d4", // dark purple (for text)
        "secondary": "#f5f5f5", // off-white
        "tertiary": '#9DB2CE', // gray
        "accent": "#EF2A39", // hot-pink
        'light-blue': "#c1e4f1", // light blue
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        'unicorn': 'linear-gradient(to top right, #c5e5f1, #b794fe, #e1a6f6)',
        'unicorn-pink-purple': 'linear-gradient(to right, #F1B3EE, #435EED)',
        'unicorn-purple-purple': 'linear-gradient(to right, #613EEA, #8064ee, #613EEA)',
      },

    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
       '.text-shadow-glow-pink': {
          textShadow: '0 0 20px #e17caa, 0 0 40px #f4d9ea',
        },

        
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
