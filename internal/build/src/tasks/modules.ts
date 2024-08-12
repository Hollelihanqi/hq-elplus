import { rollup } from "rollup";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueMacros from "unplugin-vue-macros/rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import glob from "fast-glob";
import { epRoot, excludeFiles, pkgRoot } from "@yto-uplus/build-utils";
import { generateExternal, writeBundles } from "../utils";
import { YtoUPlusAlias } from "../plugins/yto-uplus-alias";
import { buildConfigEntries, target } from "../build-info";
import url from 'rollup-plugin-url';
import postcss from 'rollup-plugin-postcss';

import type { OutputOptions } from "rollup";

export const buildModules = async () => {
  console.log("开始执行--------buildModules")
  const input = excludeFiles(
    await glob("**/*.{js,ts,vue}", {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  );
  console.log("开始执行--------pkgRoot", pkgRoot)
  console.log("开始执行--------input", input)
  const bundle = await rollup({
    input,
    plugins: [
      YtoUPlusAlias(),
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue({
            isProduction: true,
          }),
          vueJsx: vueJsx(),
        },
      }),
      nodeResolve({
        extensions: [".mjs", ".js", ".json", ".ts"],
        preferBuiltins: true
      }),
      commonjs(),
      esbuild({
        sourceMap: true,
        target,
        loaders: {
          ".vue": "ts",
        },
      }),
    ],
    external: await generateExternal({ full: false }),
    treeshake: false,
  });
  // await writeBundles(
  //   bundle,
  //   buildConfigEntries.map(([module, config]): OutputOptions => {
  //     return {
  //       format: config.format,
  //       dir: config.output.path,
  //       exports: module === "cjs" ? "named" : undefined,
  //       preserveModules: true,
  //       preserveModulesRoot: epRoot,
  //       sourcemap: true,
  //       entryFileNames: `[name].${config.ext}`,
  //     };
  //   })
  // );
};
