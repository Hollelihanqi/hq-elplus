/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-12 13:56:36
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-15 17:26:16
 * @FilePath: \yto-engine\docs3\.vitepress\utils\highlight.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// ref https://github.com/vuejs/vitepress/blob/main/src/node/markdown/plugins/highlight.ts
import chalk from "chalk";
import escapeHtml from "escape-html";
import prism from "prismjs";
import { consola } from "consola";
import hljs from "highlight.js";
// prism is listed as actual dep so it's ok to require
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const loadLanguages = require("prismjs/components/index");
// required to make embedded highlighting work...
// loadLanguages(["markup", "css", "javascript"]);

function wrap(code: string, lang: string): string {
  if (lang === "text") {
    code = escapeHtml(code);
  }
  return `<pre v-pre><code>${code}</code></pre>`;
}

export const highlight = (str: string, lang: string) => {
  if (!lang) {
    return wrap(str, "text");
  }
  if (lang && hljs.getLanguage(lang)) {
    try {
      return (
        '<pre><code class="hljs">' +
        hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
        "</code></pre>"
      );
    } catch (__) {}
  }

  // return '<pre><code class="hljs">' + wrap(str, "text") + '</code></pre>';
};
