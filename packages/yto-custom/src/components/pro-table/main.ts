import ProTable from './src/index.vue'

export { ProTable }
export default {
    install: (App:any) => {
        App.component("yto-pro-table", ProTable) //注意避坑 -> 组件内部一定要写name属性
    }
}