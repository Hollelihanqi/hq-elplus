/*
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-12-05 16:57:03
 * @LastEditTime: 2023-12-11 14:11:32
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import WindiCSS from "vite-plugin-windicss";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    WindiCSS(),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [ElementPlusResolver()],
      dts: "types/auto-imports.d.ts",
      eslintrc: {
        enabled: false,
        filepath: "types/.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
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
        target: "http://10.130.136.73:8080",
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
