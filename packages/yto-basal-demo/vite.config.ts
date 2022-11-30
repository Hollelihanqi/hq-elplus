import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 别名路径
      '@http': resolve(__dirname, 'src/http'), // 别名路径
      '@views': resolve(__dirname, 'src/views'), // 别名路径
    },
  },
  server: {
    https: false, // 是否开启https
    open: false, // 是否自动打开浏览器
    port: 8001, // 端口号
    host: true, // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
  }
})
