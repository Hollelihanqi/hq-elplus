/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-10 10:55:33
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-18 16:28:02
 * @FilePath: \yto-engine\docs3\.vitepress\config.mts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vitepress'
import { mdPlugin } from './config/plugins'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "技术平台部",
  description: "技术平台部，业务组件库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'Vue组件', link: '/mds/components/text-ellipsis' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    config: (md) => mdPlugin(md),
  },
})
