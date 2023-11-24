import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path, { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import WindiCSS from "vite-plugin-windicss";
import fs, { copyFileSync } from "fs";
import { readFile } from "fs/promises";
//@ts-ignore
import { outputFile } from "fs-extra/esm";
//@ts-ignore
import { visualizer } from "rollup-plugin-visualizer";
//@ts-ignore
import MoveFile from "./vite-plugin-move";
import dts from "vite-plugin-dts";

const componentDirs = fs.readdirSync(resolve("src/components"));
const input = {
  main: resolve("src/index.ts"), // 全局入口
  // 为每个组件创建一个入口
  ...componentDirs.reduce((entries, dir) => {
    const fullDir = resolve(`src/components/${dir}`);
    if (fs.statSync(fullDir).isDirectory()) {
      entries[dir] = resolve(`${fullDir}/index.ts`);
    }
    return entries;
  }, {}),
};

// 获取所有组件的入口文件
function getComponentEntries(dir) {
  const files = fs.readdirSync(resolve(dir));
  const componentEntries = {};
  files.forEach((file) => {
    const componentDir = path.join(dir, file);
    if (fs.statSync(resolve(componentDir)).isDirectory()) {
      const entryFile = path.join(componentDir, "index.ts");
      if (fs.existsSync(resolve(entryFile))) {
        // 注意：这里我们修改了输出路径，使其进入 components 目录
        componentEntries[`components/${file}`] = resolve(entryFile);
      }
    }
  });
  return componentEntries;
}

const componentEntries = getComponentEntries("./src/components");
console.log("__________", resolve("src/index.ts"));
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    WindiCSS({
      scan: {
        fileExtensions: ["vue", "ts", "js", "jsx", "tsx"],
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
    vueSetupExtend(),
    // dts({
    //   outputDir: 'dist/es',
    //   staticImport: true,
    //   insertTypesEntry: true,
    // }),
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
    target: "modules",
    minify: true,
    emptyOutDir: false,
    outDir: resolve(__dirname, "./dist"),
    lib: {
      entry: resolve("./src/index.ts"),
      name: "YtoCustom",
    },
    rollupOptions: {
      // input: {
      //   index: resolve("./src/index.ts"),
      //   ...componentEntries
      // },
      output: [
        {
          name: "YtoCustom",
          format: "es", // ES模块格式
          dir: "dist/es", // 输出目录
          // preserveModules: true, // 保持文件结构
          // preserveModulesRoot: resolve('./src'),
          exports: "named",
          sourcemap: false,
          generatedCode: {
            symbols: true,
          },
          // assetFileNames: `[name]/[ext]/style.css`,
          entryFileNames: `index.js`,
          // chunkFileNames: 'shared/[name].js',
          // manualChunks: () => 'everything.js'
        },
      ],
      external: [
        "vue",
        "vue-router",
        "echarts",
        "axios",
        "@vue/runtime-core",
        "gold-core",
        "element-plus",
        "immutable",
        "simple-uploader.js",
        "spark-md5",
      ],
    },
  },
});

/** 打包结束之后将一些静态文件进行移入 */
const move = (): void => {
  readFile("./package.json").then((data: any) => {
    const json = JSON.parse(data);
    // json.main = "es/index.js";
    // json.module = "es/index.js";
    // json.types = "es/index.d.ts"
    // json.files = ["es/"];
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
