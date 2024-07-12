/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-10 14:38:09
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-10 14:51:59
 * @FilePath: \yto-engine\docs3\.vitepress\theme\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@yto/custom/styles";
import YtoCustom from "@yto/custom";
/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    app.use(YtoCustom);
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "aside-outline-before": () => h("div", {}, "我是前置内容"),
    });
  },
};
