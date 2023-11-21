import { createApp } from "vue";
import "./style.css";
import { router } from "./router";
import App from "./App.vue";
import '@/icon-font/iconfont.css' // 字体文件
import "virtual:windi.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 开发阶段引入

import YtoCustom from '@yto/custom'
import "@yto/custom/es/style.css";


const app = createApp(App);
app.use(ElementPlus);
app.use(router);
app.use(YtoCustom);
app.mount("#app");
