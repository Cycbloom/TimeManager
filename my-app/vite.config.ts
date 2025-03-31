import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      usePolling: true, // 在WSL2环境下启用轮询以提高文件监视的可靠性
      interval: 100, // 轮询间隔，单位毫秒
    },
  },
});
