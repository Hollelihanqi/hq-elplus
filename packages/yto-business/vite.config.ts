import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts';
import WindiCSS from 'vite-plugin-windicss'
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
  plugins: [
    vue(),
    WindiCSS(),
    dts()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'gold-layout',
      fileName: 'index'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'gold-core', 'element-plus', '@element-plus/icons-vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        exports: 'named',
        globals: {
          vue: 'Vue',
          'gold-core': 'Tools',
          'element-plus': 'ElementPlus',
          '@element-plus/icons-vue': 'IconsVue'
        }
      }
    }
  }
})
