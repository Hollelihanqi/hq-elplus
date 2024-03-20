import type * as components from './components';

/**
 * Volar 插件实现代码提示
 *
 * https://github.com/johnsoncodehk/volar/blob/master/extensions/vscode-vue-language-features/README.md
 */

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    YtoTable: typeof components.YtoTable;
    // YtoMenu: typeof components.YtoMenu;
    // YtoEchart: typeof components.YtoEchart;
    // YtoSearchForm: typeof components.YtoSearchForm;
    // YtoTareatag: typeof components.YtoTareaTag
  }
}

declare global {
  const __DEV__: boolean;
}

export {};
