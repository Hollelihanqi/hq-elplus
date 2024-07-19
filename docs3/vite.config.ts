/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-02-24 16:52:05
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-18 16:39:48
 * @FilePath: \xlfk-vite-vue3\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { defineConfig, ConfigEnv, UserConfig, loadEnv } from "vite";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import prismjs from "vite-plugin-prismjs";
import WindiCSS from "vite-plugin-windicss";
import UnoCSS from "unocss/vite";
import { MarkdownTransform } from "./.vitepress/plugins/markdown-transform";
import VueMacros from "unplugin-vue-macros/vite";
import mkcert from "vite-plugin-mkcert";
import type { Alias } from "vite";
// import dns from "dns";
// dns.setDefaultResultOrder("verbatim");
// // https://vitejs.dev/config/

const alias: Alias[] = [
  {
    find: "~/",
    replacement: `${path.resolve(__dirname, "./.vitepress/vitepress")}/`,
  },
];

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    resolve: {
      alias,
    },

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
      MarkdownTransform(),
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vueJsx: vueJsx(),
        },
      }),
      mkcert(),
      UnoCSS(),
      // WindiCSS(),
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
        "/api/v2": {
          target: "http://10.130.137.53:8000", // sit
          changeOrigin: true,
        },
      },
    },
  };
});
