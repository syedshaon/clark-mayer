import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

// Define the repository name based on your GitHub Pages setup.
// This is used as the base path when building for production.
const repoName = "clark-mayer";

export default defineConfig(({ command }) => {
  // Check if we are in 'build' mode (production) or 'serve' mode (development)
  const isProduction = command === "build";

  // Set the base path: /repo-name/ for production, and / for local dev
  const base = isProduction ? `/${repoName}/` : "/";

  return {
    // 1. Set the correct base path for Vite
    base: base,
    plugins: [
      handlebars({
        partialDirectory: resolve(__dirname, "src/partials"),
        // 2. Pass the dynamic 'base' variable to all Handlebars templates
        context: {
          base: base,
        },
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          about: resolve(__dirname, "about.html"),
          contact: resolve(__dirname, "contact.html"),
        },
      },
    },
  };
});
