import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "./dist", // תיקיית הפלט לקבצי הבנייה
    emptyOutDir: true, // נקה את תיקיית הפלט לפני בנייה חדשה
  },
});
