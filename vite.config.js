import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 5173,  // Ensure this port is open
    open: true,  // Auto open browser
  },
  build: {
    outDir: 'build',  // Change output directory from 'dist' to 'build'
  },
});