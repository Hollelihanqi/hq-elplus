/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2023-02-15 18:33:41
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-05-08 18:07:49
 * @FilePath: \element-plus\docs\.vitepress\config\plugins.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from "path";
import fs from "fs";
import MarkdownIt from "markdown-it";
import mdContainer from "markdown-it-container";
import { docRoot } from "@yto-custom/build-utils";
import externalLinkIcon from "../plugins/external-link-icon";
import tableWrapper from "../plugins/table-wrapper";
import tooltip from "../plugins/tooltip";
import tag from "../plugins/tag";
import { ApiTableContainer } from "../plugins/api-table";
import { highlight } from "../utils/highlight";
import type Token from "markdown-it/lib/token";
import type Renderer from "markdown-it/lib/renderer";

const localMd = MarkdownIt().use(tag);

interface ContainerOpts {
  marker?: string | undefined;
  validate?(params: string): boolean;
  render?(tokens: Token[], index: number, options: any, env: any, self: Renderer): string;
}

export const mdPlugin = (md: MarkdownIt) => {
  md.use(externalLinkIcon);
  md.use(tableWrapper);
  md.use(tooltip);
  md.use(tag);
  md.use(mdContainer, "demo", {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/);
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const description = m && m.length > 1 ? m[1] : "";
        const sourceFileToken = tokens[idx + 2];
        let source = "";
        const sourceFile = sourceFileToken.children?.[0].content ?? "";

        if (sourceFileToken.type === "inline") {
          source = fs.readFileSync(path.resolve(docRoot, "examples", `${sourceFile}.vue`), "utf-8");
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`);

        return `<Demo :demos="demos" source="${encodeURIComponent(
          highlight(source, "vue")
        )}" path="${sourceFile}" raw-source="${encodeURIComponent(source)}" description="${encodeURIComponent(
          localMd.render(description)
        )}">`;
      } else {
        return "</Demo>";
      }
    },
  } as ContainerOpts);

  md.use(ApiTableContainer);
};
