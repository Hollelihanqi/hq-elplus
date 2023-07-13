/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-03-24 17:52:24
 * @LastEditors: weichunpei
 * @LastEditTime: 2023-05-12 16:35:48
 * @FilePath: \yto-engine\docs\docs\.vitepress\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AErts
 */

import { defineConfig } from "vitepress";
import { applyPlugins } from "@ruabick/md-demo-plugins";
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  title: "技术平台部-业务组件库",
  lastUpdated: true,
  themeConfig: {
    socialLinks: [{ icon: "github", link: "https://github.com" }],
    sidebar: {
      "/": [
        {
          text: "快速开始",
          link: "/guide/fast",
        },
        {
          text: "组件",
          items: [
            // {
            //   text: "ProTable",
            //   link: "/examples/pro-table/index.md",
            // },
            {
              text: "Table 表格",
              link: "/examples/table/index.md",
            },
            {
              text: "Menu 菜单",
              link: "/examples/menu/index.md",
            },
            {
              text: "Chart 图表",
              link: "/examples/echart/index.md",
            },
            {
              text: "Form 表单",
              link: "/examples/fromItem/index.md",
            },
            {
              text: "Dialog 弹框",
              link: "/examples/dialog/index.md",
            },
            {
              text: "RemoteSearch 远程搜索",
              link: "/examples/remote-search/index.md",
            }
          ],
          collapsed: false,
        },
      ],
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
  },
  /**
   * 自定义 markdown 解析器
   *
   * @see markdown https://vitepress.vuejs.org/config/app-configs#markdown
   */
  markdown: {
    /**
     * 配置 Markdown-it 实例
     *
     * @param { Object } md markdown 实例
     */
    config: (md) => {
      applyPlugins(md);
    },
  },
  plugins: [
    WindiCSS(),
  ],
});
