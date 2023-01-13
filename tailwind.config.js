// tailwind.config.js
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
   
    minWidth: {
      tablet: "768px",
    },
    extend: {
      colors: {
        'everly':{
          light_blue: "#e9e9fd",
          sub_blue: "#2a2af0",
          mid_grey: "#c7c7c7",
          light_grey: "#f0f0f0",
          main: "#3f52fc",
          dark_grey: "#707070",
          white: "#ffffff",
          black: "#000000",
          bright_grey: "#f0f0f0",
          wbg_grey: "#fafafa",
          red: "#d5152c",
          buy: "b20f47"
        }
      }
    },    
  },
};
