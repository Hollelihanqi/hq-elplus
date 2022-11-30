<template>
    <div :id="container" class="ech-container"></div>
</template>
<script lang="ts" setup>
import {
    getCurrentInstance,
    onMounted,
    defineProps,
    watch,
    defineEmits,
    defineExpose,
    onActivated,
} from "vue";
import { guid } from "../utils";
import { Map } from "immutable";
const props = defineProps({
    etype: {
        type: String,
        default: "line",
    },
    xData: {
        type: Array,
        default: () => [],
    },
    options: {
        type: Object,
        default: () => ({}),
    },
    seriesItemOptions: {
        type: Object,
        default: () => ({}),
    },
});
const container = guid();
const internalInstance = getCurrentInstance();
const _echarts = internalInstance?.appContext.config.globalProperties.$echarts;
const emits = defineEmits(["handleItemClick"]);
let myChart: any = null;

const showLoading = () => {
    myChart.showLoading({
        text: "正在加载...",
        color: "#2c3cd8",
        textColor: "#2c3cd8",
        zlevel: 0,
    });
};

const init = () => {
    myChart = _echarts.init(document.getElementById(container));
    showLoading();
    myChart.on("click", function (params: any) {
        emits("handleItemClick", params);
    });
};

const mergeOptios = (defaultOptions: any, newOptions = {}) => {
    const { options } = props;
    let _options: any = defaultOptions; //用户存储合并后的 options 组件通过 prop <options> 和 setOption 函数接收到的 <options> 有相同的 key ，会被函数接收到的 options 覆盖掉
    if (options && Object.keys(options).length) {
        // 如果有组件传入的 options
        _options = defaultOptions.mergeDeep(options);
    }
    if (Object.keys(newOptions).length) {
        // 如果有接收到新的 options
        _options = _options.mergeDeep(newOptions);
    }
    return _options.toObject();
};
const setOption = () => {
    const optionsLine = Map({
        color: ["#ff4d4d"],
        tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            textStyle: {
                color: "#fff",
            },
            axisPointer: {
                type: "line",
                lineStyle: {
                    type: "solid",
                },
            },
        },
        xAxis: {
            type: "category",
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: "background: rgba(0, 0, 0, 0.15)",
                },
            },
            data: props.xData,
        },
        yAxis: {
            type: "value",
            splitLine: {
                lineStyle: {
                    type: "dashed",
                },
            },
        },
        series: [],
    });
    const optionsPie = Map({
        tooltip: {
            trigger: "item",
        },
        legend: {
            top: "5%",
            left: "center",
        },
        color: ["#3678FF", "#EF6330"],
    });
    const optionsBar = Map({
        backgroundColor: "#fff",
        animation: true,
        textStyle: {
            fontSize: 14,
            color: "#999",
        },
        tooltip: {
            show: true,
        },
        xAxis: {
            show: true,
            type: "category",
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        yAxis: {
            name: "",
            type: "value",
            axisLabel: {
                show: true,
                margin: 15,
                textStyle: {
                    fontSize: 14,
                },
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#D9D9D9",
                },
            },
            data: [],
        },
        series: [],
    });
    const newOptions =
        props.etype === "line"
            ? mergeOptios(optionsLine)
            : props.etype === "bar"
                ? mergeOptios(optionsBar)
                : mergeOptios(optionsPie);
    if (props.etype === "pie" || props.etype === "bar") {
        // 无数据
        if (
            (newOptions.series &&
                Array.isArray(newOptions.series) &&
                (newOptions.series.length === 0 ||
                    (newOptions.series[0].data &&
                        newOptions.series[0].data.length === 0))) ||
            (newOptions.series &&
                !Array.isArray(newOptions.series) &&
                newOptions.series.data &&
                newOptions.series.data.length === 0)
        ) {
            let radius = ["30%", "50%"];
            if (newOptions.series && newOptions.series.length) {
                radius = newOptions.series[0].radius;
            }
            const obj = {
                type: "pie",
                color: "#D3D3D3",
                radius: radius,
                showEmptyCircle: true,
                label: {
                    show: false,
                },
                data: [],
            };
            const title = {
                show: true,
                text: "暂无数据",
                x: "center",
                y: "center",
                textStyle: {
                    color: "#8c8c8c",
                    fontWeight: "normal",
                    fontSize: 14,
                },
            }
            newOptions.title = title;
            if (props.etype === 'pie') {
                newOptions.series = obj
            }
            if (props.etype === 'bar') {
                newOptions.yAxis.show = false
                newOptions.xAxis.show = false
            }
        } else {
            myChart.clear();
        }
    }
    setTimeout(() => {
        myChart.hideLoading();
        myChart.setOption(newOptions);
    }, 300);
};

const chartResize = () => {
    window.addEventListener("resize", () => {
        myChart.resize();
    });
};
watch(
    () => props,
    () => {
        showLoading();
        setOption();
        myChart.resize();
    },
    {
        deep: true,
    }
);
onMounted(() => {
    init();
    setOption();
    myChart.resize();
    chartResize();
});
onActivated(() => {
    myChart.resize();
});
defineExpose({
    setOption,
});
</script>
<style lang="scss" scoped>
.ech-container {
    width: 100%;
    height: 100%;
}
</style>
  