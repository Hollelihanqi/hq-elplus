import { defineConfig, build } from "vite";
import path, { resolve } from "path";

/** 单组件按需构建 */
// const buildSingle = async name => {
//     await build(
//         defineConfig({

//             build: {
//                 lib: {
//                     entry: path.resolve(compontsDir, name),
//                     name: "index",
//                     fileName: "index",
//                     formats: ["es", "umd"]
//                 },
//                 rollupOptions,
//                 outDir: path.resolve(outputDir, name)
//             }
//         })
//     )
// }
