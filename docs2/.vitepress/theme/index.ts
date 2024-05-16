/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-05-11 15:42:30
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-05-14 20:35:35
 * @FilePath: \yto-engine\docs2\.vitepress\theme\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import VPApp, { NotFound, globals } from "../vitepress";
import { define } from "../utils/types";
import "uno.css";
import "./style.css";
import type { Theme } from "vitepress";

export default define<Theme>({
  NotFound,
  Layout: VPApp,
  enhanceApp: ({ app }) => {
    globals.forEach(([name, Comp]) => {
      app.component(name, Comp);
    });
  },
});
