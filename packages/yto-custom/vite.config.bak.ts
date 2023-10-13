import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import WindiCSS from 'vite-plugin-windicss'
import { copyFileSync, existsSync, readdirSync, rmSync } from "fs";
import { readFile } from "fs/promises";
//@ts-ignore
import { outputFile } from "fs-extra/esm";
//@ts-ignore
import { visualizer } from "rollup-plugin-visualizer";
//@ts-ignore
import MoveFile from "./vite-plugin-move";
import dts from 'vite-plugin-dts'
emptyDir(resolve(__dirname, 'dist'))
emptyDir(resolve(__dirname, 'types'))

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    WindiCSS({
      scan: {
        fileExtensions: ['vue', 'ts', 'js', 'jsx', 'tsx'],
      },
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [ElementPlusResolver()],
      dts: "types/auto-imports.d.ts",
      eslintrc: {
        enabled: true,
        filepath: "types/.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus(),

    vueSetupExtend(),
    dts({
      copyDtsFiles: true,
      outputDir: [
        'dist',
        'types'
        // 'types/inner'
      ],
      // include: ['src/index.ts'],
      exclude: ['src/ignore'],
      staticImport: true,
      // rollupTypes: true,
      insertTypesEntry: true,
      compilerOptions: {
        declarationMap: true
      }
    }),
    MoveFile(() => {
      move();
    }),
    visualizer(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 别名路径
    },
  },
  build: {
    // target: "modules", // 支持原生 ES 模块、原生 ESM 动态导入 和 import.meta 的浏览器。
    // minify: true,
    // emptyOutDir: false,
    // outDir: resolve(__dirname, "./dist") /** 指定输出路径 */,
    lib: {
      entry: [resolve(__dirname, 'src/index.ts')],
      name: "YtoCustom",
      formats: ['es']
    },
    rollupOptions: {
      external: ["vue", "vue-router", "echarts", "axios", "@vue/runtime-core"],
      // output: [
      //   {
      //     name: "YtoCustom",
      //     format: "es",
      //     dir: "dist/es",
      //     // 输出后的文件名
      //     entryFileNames: "index.js",
      //     exports: "named",
      //   },
      // ],
    },
  },
});

/** 打包结束之后将一些静态文件进行移入 */
const move = (): void => {
  readFile("./package.json").then((data: any) => {
    const json = JSON.parse(data);
    json.main = "es/index.js";
    json.module = "es/index.js";
    // json.types = "es/index.d.ts"
    json.files = ["es/"];
    delete json.scripts;
    outputFile(path.resolve("./dist", `package.json`), JSON.stringify(json), "utf-8");
    const files = [
      { input: "./README.md", outDir: "dist/README.md" },
      { input: "./LICENSE", outDir: "dist/LICENSE" },
    ] as const;

    files.forEach((item): void => {
      copyFileSync(item.input, item.outDir);
    });
    console.warn("\n" + `${json.name} ${json.version} 版本打包成功! ` + "\n");
  });
};

function emptyDir(dir: string) {
  if (!existsSync(dir)) {
    return
  }

  for (const file of readdirSync(dir)) {
    rmSync(resolve(dir, file), { recursive: true, force: true })
  }
}