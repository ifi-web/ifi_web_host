import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // This allows the server to be accessible over the network
    port: 5173, // You can choose any port number you want
    open: true, // Optional: Automatically open the app in the browser
  },
});
