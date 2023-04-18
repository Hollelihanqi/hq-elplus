/*
 * @Author: 魏春霈
 * @Date: 2023-04-17 11:00:49
 * @LastEditors: 魏春霈
 * @LastEditTime: 2023-04-18 09:32:41
 * @Description: 自定义组合函数
 */
const echartsComposable = (chartRef: any) => {
  const getEchartInstance = () => {
    console.log('chart-echartsComposable', chartRef)
    return chartRef ? unref(chartRef).getEchartInstance() : null
  }
  return {
    getEchartInstance
  }
}

export default echartsComposable

