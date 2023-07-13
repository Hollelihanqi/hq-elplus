/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-02-24 16:52:05
 * @LastEditors: 魏春霈
 * @LastEditTime: 2023-04-19 17:19:17
 * @FilePath: \xlfk-vite-vue3\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { defineConfig, ConfigEnv, UserConfig, loadEnv } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";

import dns from "dns";
dns.setDefaultResultOrder("verbatim");
// // https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    optimizeDeps: {
      exclude: ["vitepress"],
    },
    plugins: [
      vueJsx({
        transformOn: true,
        mergeProps: true,
      }),
      AutoImport({
        imports: ["vue"],
      }),
    ],
    server: {
      hmr: {
        overlay: false,
      },
      proxy: {
        "/service-api": {
          target: "http://10.130.16.149:8082",
          changeOrigin: true,
        },
      },
    },
  };
});
