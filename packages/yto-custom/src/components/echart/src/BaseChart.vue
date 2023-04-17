<template>
  <div class="echart-container" :style="{ height,width }">
    <div :id="container" :style="{ height,width }"  v-resize-element="resizeHandler"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from "echarts";
import { guid } from "@yto/utils";
import { debounce } from "lodash-es";
import { directivesList } from "@/directives/index";
export default defineComponent({
  props: {
    options: {
      type: Object,
      default: () => {},
      required: true,
    },
    height: {
      type: String,
      default: "400px",
    },
    width: {
      type: String,
      default: "100%",
    },
  },
  directives: {
    "resize-element": directivesList.resizeElement,
  },
  setup(props) {
    let chart: any | null;

    const container = `baseChart_${guid()}`;
    const showLoading = () => {
      chart &&
        chart.showLoading({
          text: "正在加载...",
          color: "#2c3cd8",
          textColor: "#2c3cd8",
          zlevel: 0,
        });
    };

    const initChart = () => {
      chart = echarts.init(
        document.querySelector(`#${container}`) as HTMLElement
      );
      showLoading();
      setChartOption();
      //窗口大小改变，重新绘图
      // window.addEventListener("resize", resizeHandler);
    };
    const setChartOption = async (options?: any) => {
      await nextTick();
      console.log('setChartOption', options || props.options);
      chart && chart.setOption(options || props.options);
      chart && chart.hideLoading();
    };

    const resizeHandler = debounce(() => {
      chart && chart.resize();
    }, 200);

    const disposeChart = () => {
      chart && chart.dispose();
      chart = null;
    };

    watch(
      () => props.options,
      (value) => {
        showLoading();
        setChartOption(value);
      },
      {
        deep: true,
      }
    );

    onActivated(resizeHandler);
    onMounted(initChart);
    onUnmounted(disposeChart);

    return {
      resizeHandler,
      container,
    };
  },
});
</script>
