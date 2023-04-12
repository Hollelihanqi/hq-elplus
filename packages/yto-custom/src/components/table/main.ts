import YtoTable from './src/index.vue'

export { YtoTable }
export default {
    install: (App:any) => {
        App.component("yto-table", YtoTable) //注意避坑 -> 组件内部一定要写name属性
    }
}