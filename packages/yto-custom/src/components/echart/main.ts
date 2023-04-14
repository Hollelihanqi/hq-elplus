import YtoEchart from './src/index.vue'

export { YtoEchart }
export default {
    install: (App:any) => {
        App.component("yto-echart", YtoEchart)
    }
}