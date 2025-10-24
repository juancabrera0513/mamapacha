/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#d72638",   // rojo vibrante
          accent: "#f4a261",    // dorado/ají
          dark: "#1b1b1b",
        },
        fontFamily: {
          display: ["Playfair Display", "serif"],
          sans: ["Inter", "system-ui", "sans-serif"]
        },
        boxShadow: {
          soft: "0 10px 30px rgba(0,0,0,0.12)"
        }
      },
    },
    plugins: [],
  };
  