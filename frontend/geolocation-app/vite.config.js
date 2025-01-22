import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Accept connections from any IP address
    port: 5173, // Ensure it runs on port 5173
  },
});
