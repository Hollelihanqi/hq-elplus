import { App } from 'vue'
import { YtoTable } from './components/table/main';
import directives from './directives'

export {
  directives
}

export default {
  install(App: any) {
      const components = import.meta.glob('./components/*/src/index.vue', { eager: true });
      Object.entries(components).forEach(([path, definition]: any) => {
        // 根据文件名获取组件名
        let componentName = path.split('/')[2]
        componentName = 'yto-' + componentName
          // 在 vue 实例上注册组件
          App.component(componentName, definition.default)
      })
  }
}