import YtoEchart from './src/index.vue'
import YtoBarEchart from './src/BarChart.vue'
import YtoLineEchart from './src/LineChart.vue'

export { YtoEchart, YtoBarEchart,  YtoLineEchart}
export default {
    install: (App:any) => {
        App.component("yto-base-echart", YtoEchart) 
        App.component("yto-bar-echart", YtoBarEchart)
        App.component("yto-line-echart", YtoLineEchart)
    }
}