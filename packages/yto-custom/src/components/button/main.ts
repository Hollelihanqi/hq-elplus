import ButonTable from './src/index.vue'

export { ButonTable }
export default {
    install: (App:any) => {
        App.component("yto-button", ButonTable) //注意避坑 -> 组件内部一定要写name属性
    }
}