/*
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-04-20 20:40:39
 * @LastEditTime: 2023-04-21 16:20:41
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


// 开发阶段引入

// import YtoCustom from 'yto-custom'
// import 'yto-custom/dist/style.css'

import YtoCustom from '@yto/custom'
import '@yto/custom/es/style.css'

const app = createApp(App)
app.use(YtoCustom)
app.mount('#app')
