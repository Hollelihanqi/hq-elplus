/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-04-06 19:17:28
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2023-04-06 19:21:32
 * @FilePath: \yto-engine\docs\.vitepress\plugin\plugin-demo.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MarkdownItContainer from 'markdown-it-container'
import MarkdownIt from 'markdown-it'

/**
 * 创建 markdown 实例
 *
 * @see markdown-it https://markdown-it.docschina.org
 * @see markdown-it https://juejin.cn/post/6844903688536850440
 */
const markdown = MarkdownIt({
  breaks: true // 转换段落里的 '\n' 到 <br>
})

/**
 * 自定义 md 插件
 *
 * @param { Object } md markdown 实例
 */
export const PluginDemo = (md): void => {
  /**
   * 自定义 md 语法
   *
   * 语法为 ::: demo
   */
  md.use(MarkdownItContainer, 'demo', {
    validate(params: string): boolean {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens: any[], idx: number) {
      if (tokens[idx].nesting === 1) {
        const m: RegExpMatchArray = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
        const description: string = m && m.length > 1 ? m[1] : ''
        const content: string =
          tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        const source: string = md.utils.escapeHtml(content)

        return `<vp-demo source="${source}">${encodeURIComponent(
          markdown.render(description)
        )}`
      }

      return '</vp-demo>'
    }
  })
}
