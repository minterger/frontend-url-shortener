// postcss.config.js
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindcss_postcss from "@tailwindcss/postcss"; // Importa el nuevo plugin

export default {
  plugins: [
    tailwindcss,
    tailwindcss_postcss(), // Usa la función para el plugin de Tailwind CSS
    autoprefixer,
  ],
};
