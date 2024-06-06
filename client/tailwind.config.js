// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust as necessary
  ],
  theme: {
    extend: {

    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // Ensure the light theme is included
  },
};
