import { App } from "vue";
import ExtendDialog from './src/Index.vue'

export { ExtendDialog }

export default {
  install(app: App<Element>, { prefix }: any = { prefix: 'Yto' }) {
    app.component(`${prefix}ExtendDialog`, ExtendDialog)
  }
}