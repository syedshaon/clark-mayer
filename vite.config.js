import { defineConfig } from "vite";

export default defineConfig({
  base: "/", // if using username.github.io
  // base: "/repo-name/", // if using github.com/username/repo-name
  build: {
    outDir: "dist",
  },
});
