/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-02-24 16:52:05
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-03-31 10:39:29
 * @FilePath: \xlfk-vite-vue3\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { defineConfig, ConfigEnv, UserConfig, loadEnv } from "vite";
// import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
import dns from 'dns'
dns.setDefaultResultOrder('verbatim')
// // https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    // plugins: [
    //   vue(),
    //   vueJsx({
    //     transformOn: true,
    //     mergeProps: true,
    //   })
    // ]
  };
});
