import type { App, Component } from 'vue'
import CustomDialog from './src/index.vue'

export type Install<T> = T & {
    install(app: App): void
}
const prefix = 'yto'

/**
 * 注册组件
 *
 * @param { Object } main 组件实例
 * @returns { Object } 组件实例
 */
export const install = <T extends Component>(main: T): Install<T> => {
    ; (main as Record<string, unknown>).install = (app: App): void => {
        const { name } = main
        name && app.component(`${prefix}${name}`, main)
    }
    return main as Install<T>
}

export const YtoDialog = install(CustomDialog)
export default CustomDialog
