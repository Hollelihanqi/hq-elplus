import YtoEchart from './src/index.vue'

export { YtoEchart }
export default {
    install: (App:any) => {
        App.component("yto-echart", YtoEchart) //注意避坑 -> 组件内部一定要写name属性
    }
}