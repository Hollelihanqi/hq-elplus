import { App } from 'vue'

import { ExtendDialog } from './extend-dialog/index'

export { ExtendDialog }

import 'virtual:windi.css'

export default {
  install (app: App<Element>, { prefix }: any = { prefix: 'Yto' }): void {
    const list: any = { ExtendDialog }
    for(let key of Object.keys(list)) {
      app.component(`${prefix}${key}`, list[key])
    }
  }
}
