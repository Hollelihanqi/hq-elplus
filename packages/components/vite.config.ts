import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    WindiCSS({
      scan: {
        fileExtensions: ["vue", "ts", "js", "jsx", "tsx"],
      },
    }),
    vueSetupExtend(),
  ],
});
