import { createApp } from "vue";
import "./style.css";
import { router } from "./router";
import App from "./App.vue";

// 开发阶段引入

// import YtoCustom from 'yto-custom'
// import 'yto-custom/dist/style.css'

import YtoCustom from "@yto/custom";
import "@yto/custom/es/style.css";

const app = createApp(App);
app.use(router);
app.use(YtoCustom);
app.mount("#app");
