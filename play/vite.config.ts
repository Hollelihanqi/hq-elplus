import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import WindiCSS from "vite-plugin-windicss";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    AutoImport({
      imports: ["vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 别名路径
    },
  },
  server: {
    port: 1206,
    proxy: {
      "/api/v2": {
        target: "http://10.130.137.53:8000", // sit
        // target: "http://10.130.17.91:8000", // uat
        // target: "http://192.168.201.11:5000"
        changeOrigin: true,
      },
      "/api": {
        // target: "http://10.130.137.53:8080",
        target: "http://10.130.15.223:8100", // UAT,
        changeOrigin: true,
      },
      "/_search": {
        target: "http://10.128.88.245:9200",
        changeOrigin: true,
      },
      "/yto-collect": {
        target: "http://10.130.14.191:9999",
        changeOrigin: true,
      },
      "/service-api": {
        target: "http://10.130.16.149:8082",
        changeOrigin: true,
      },
    },
  },
});
