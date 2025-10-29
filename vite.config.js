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
          "certification-guides": resolve(__dirname, "certification-guides.html"),
          "clarke-moyer-cissp-certification-passing-guide": resolve(__dirname, "clarke-moyer-cissp-certification-passing-guide.html"),
          "clarke-moyer-world-famous-apple-crisp-recipe": resolve(__dirname, "clarke-moyer-world-famous-apple-crisp-recipe.html"),
          cooking: resolve(__dirname, "cooking.html"),
          "free-for-charity": resolve(__dirname, "free-for-charity.html"),
          fun: resolve(__dirname, "fun.html"),
          "it-project-management-resume-of-clarke-moyer": resolve(__dirname, "it-project-management-resume-of-clarke-moyer.html"),
          "learn-free-charity": resolve(__dirname, "learn-free-charity.html"),
          "western-governors-university-bs-it": resolve(__dirname, "western-governors-university-bs-it.html"),
          "wgu-referral-program": resolve(__dirname, "wgu-referral-program.html"),
          "who-i-am": resolve(__dirname, "who-i-am.html"),
          "psu-arl-referral-program": resolve(__dirname, "psu-arl-referral-program.html"),
          "DCGS-A-Resume-Clarke-Moyer-10-MAR-2014PDF": resolve(__dirname, "DCGS-A-Resume-Clarke-Moyer-10-MAR-2014PDF.pdf"),
        },
      },
    },
  };
});
