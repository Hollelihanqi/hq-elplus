/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-10 14:38:09
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-16 18:29:30
 * @FilePath: \yto-engine\docs3\.vitepress\theme\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/** @type {import('vitepress').Theme} */

import { h } from "vue";
import VPApp, { NotFound, globals } from "../vitepress";
import DefaultTheme from "vitepress/theme";
// import { define } from '../utils/types'

// import 'uno.css'
// import './style.css'

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";


// import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  NotFound,
  Layout: VPApp,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    // app.use(hljsVuePlugin)
    // @ts-ignore
    // if (import.meta.env.SSR) return;
    // const custom = await import("@yto/custom").then((m) => m);
    // app.use(custom.default)
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp);
    });
  },
  // Layout() {
  //   return h(DefaultTheme.Layout, null, {
  //     "aside-outline-before": () => h("div", {}, "我是前置内容"),
  //   });
  // },
};
