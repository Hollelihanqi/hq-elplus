/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-19 15:24:09
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-19 15:24:30
 * @FilePath: \yto-engine\docs3\unocss.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig, presetAttributify, presetIcons, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  // include: [`${__dirname}/**/*`],
  // exclude: [`${__dirname}/node_modules/**/*`],
  content: {
    pipeline: {
      include: [`${__dirname}/**/*`],
      exclude: [`${__dirname}/node_modules/**/*`],
    },
  },
  theme: {
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    colors: {
      primary: {
        DEFAULT: "#2563eb",
        deep: "#1d4ed8",
      },
    },
  },
});
