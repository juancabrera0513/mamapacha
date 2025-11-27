/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Colores de marca
        primary: "#E43C31",  // rojo marca
        accent: "#41C1CC",   // teal marca

        // (Opcional) nombres adicionales si los quisieras
        brandRed: "#E43C31",
        brandTeal: "#41C1CC",

        dark: "#1b1b1b",
      },
      fontFamily: {
        // Headings / display (cuando tengas la fuente)
        display: ["AlLePorsche", "Poppins", "system-ui", "sans-serif"],
        // Body / texto general
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};
