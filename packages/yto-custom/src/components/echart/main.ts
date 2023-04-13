import YtoEchart from './src/index.vue'
import YtoLineEchart  from './src/LineChart.vue'
import YtoBarEchart from './src/BarChart.vue'

export { YtoEchart, YtoBarEchart, YtoLineEchart }
export default {
    install: (App:any) => {
        App.component("yto-chart", YtoEchart) 
        App.component("yto-bar-chart", YtoBarEchart)
        App.component("yto-line-chart", YtoLineEchart)
    }
}