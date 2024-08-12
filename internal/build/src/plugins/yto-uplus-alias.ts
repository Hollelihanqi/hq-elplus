import { PKG_NAME, PKG_PREFIX } from "@yto-uplus/build-constants";

import type { Plugin } from "rollup";

export function YtoUPlusAlias(): Plugin {
  const themeChalk = "theme-chalk";
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}` as const;
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}` as const;

  console.log('sourceThemeChalk',sourceThemeChalk)
  console.log('bundleThemeChalk',bundleThemeChalk)
  return {
    name: "yto-uplus-alias-plugin",
    resolveId(id: any) {
      if (!id.startsWith(sourceThemeChalk)) return;
      console.log(`Resolving: ${id}`);
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: "absolute",
      };
    },
  };
}
