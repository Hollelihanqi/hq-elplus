import { version } from "./version";
import type { App, Plugin } from "vue";

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    for (const [componentName, component] of Object.entries(components)) {
      app.use(component);
    }
  };

  return {
    version,
    install,
  };
};
