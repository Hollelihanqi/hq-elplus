/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-16 10:57:36
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-17 15:05:38
 * @FilePath: \yto-engine\docs3\.vitepress\vitepress\composables\page-nav.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { computed } from "vue";
import { useData } from "vitepress";
import { ensureStartingSlash, isArray, removeExtention as removeExtension } from "../utils";
import { getFlatSideBarLinks, getSidebarConfig } from "./sidebar";

export function usePageNav() {
  const { page, theme } = useData();

  const path = computed(() => {
    return removeExtension(ensureStartingSlash(page.value.relativePath));
  });

  const candidates = computed(() => {
    const config = getSidebarConfig(theme.value.sidebars, path.value);
    return isArray(config) ? getFlatSideBarLinks(config) : [];
  });

  const index = computed(() => {
    return candidates.value.findIndex((item) => {
      return item.link === path.value;
    });
  });
  const next = computed(() => {
    if (theme.value.nextLinks !== false && index.value > -1 && index.value < candidates.value.length - 1) {
      return candidates.value[index.value + 1];
    }

    return null;
  });

  const prev = computed(() => {
    if (theme.value.prevLinks !== false && index.value > 0) {
      return candidates.value[index.value - 1];
    }
    return null;
  });

  const hasLinks = computed(() => !!next.value || !!prev.value);
  return {
    next,
    prev,
    hasLinks,
  };
}
