import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import path, { resolve } from "path";
import dts from 'vite-plugin-dts'
import { copyFileSync } from 'fs'
import { visualizer } from 'rollup-plugin-visualizer'
//@ts-ignore
import { name, version } from './package.json'
//@ts-ignore
import MoveFile from './vite-plugin-move'


export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus(),
    // dts({
    //   // skipDiagnostics: true /** 是否跳过类型诊断 */,
    //   // staticImport: true /** 是否将动态引入转换为静态 */,
    //   // outputDir: ['./dist/es'] /** 可以指定一个数组来输出到多个目录中 */,
    //   insertTypesEntry: false /** 是否生成类型声明入口 */,
    //   cleanVueFileName: true /** 是否将 '.vue.d.ts' 文件名转换为 '.d.ts' */,
    //   copyDtsFiles: true /** 是否将源码里的 .d.ts 文件复制到 outputDir */,
    //   /** 构建后回调钩子 */
    //   afterBuild: (): void => {
    //     move()
    //   }
    // }),
    MoveFile(() => { move() }),
    visualizer()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 别名路径
    },
  },
  build: {
    target: "modules",// 支持原生 ES 模块、原生 ESM 动态导入 和 import.meta 的浏览器。
    minify: true,
    emptyOutDir: false,
    outDir: resolve(__dirname, './dist') /** 指定输出路径 */,
    lib: {
      entry: "./src/index.ts",
      name: "YtoCustom",
    },
    rollupOptions: {
      external: ["vue"],
      output: [
        {
          name: "YtoCustom",
          format: "es",
          // exports: 'named',
          dir: "dist/es",
          entryFileNames: 'index.js',
          // chunkFileNames: '[name].js',
          // assetFileNames: '[name].[ext]',
          inlineDynamicImports: false,
        }
      ],
    }
  },
})

/** 打包结束之后将一些静态文件进行移入 */
const move = (): void => {
  const files = [
    { input: './README.md', outDir: 'dist/README.md' },
    { input: './dist-package.json', outDir: 'dist/package.json' },
    // { input: './LICENSE', outDir: 'dist/LICENSE' }
  ] as const

  files.forEach((item): void => {
    copyFileSync(item.input, item.outDir)
  })

  console.warn('\n' + `${name} ${version} 版本打包成功! ` + '\n')
}