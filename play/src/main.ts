/*
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-11-22 14:02:38
 * @LastEditTime: 2023-11-28 19:26:39
 */
import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import "@/icon-font/iconfont.css"; // 字体文件
import "virtual:windi.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 开发阶段引入

import YtoCustom, { directives } from "@yto/custom";
import "@yto/custom/styles";

import "./style.css";
const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(YtoCustom).use(directives);
app.mount("#app");
