<script lang="ts">
import { defineComponent, h, ref, getCurrentInstance } from "vue";
import { ElSelect, ElOption, ElConfigProvider } from "element-plus";
import { request, debounce } from "@/_utils";
import type { ExtractPropTypes } from "vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

const props = {
  url: {
    type: String,
    default: "",
  },
  method: {
    type: String,
    default: "GET",
  },
  isRemoteSearch: {
    type: Boolean,
    default: true,
  },
  requestApi: {
    type: Function,
    default: null,
  },
  requestAuto: {
    type: Boolean,
    default: true,
  },
  searchField: {
    type: String,
    default: "",
  },
  requestParams: {
    type: Object,
    default: () => ({}),
  },
  defaultParams: {
    type: Object,
    default: () => ({}),
  },
  requestHeaders: {
    type: [Object, Function],
    default: () => ({}),
  },
  resultKey: {
    type: String,
    default: "items",
  },
  dataCallback: {
    type: [Function],
    required: false,
    default: null,
  },
  valueKey: {
    type: String,
    default: "id",
  },
  labelKey: {
    type: String,
    default: "label",
  },
  modelItem: {
    type: Boolean,
    default: false,
  },
  optTemp: {
    type: [Function, Object],
    default: null,
  },
  w: {
    type: String,
    default: "100%",
  },
  getInstance: {
    type: Function,
    default: null,
  },
  getExposed: {
    type: Function,
    default: null,
  },
  // modelValue: {
  //   // 此属性是 vue3.0 默认的 v-model 双向数据绑定 prop，请在子组件上通过 v-model 进行传递
  //   // 因为组件内部时通过 watch 监听 v-model 的值的变化来更新组件的内部 _value；
  //   // 所以清除表单时一定要手动对 v-model 的值进行手动置空，否则组件下次不会更新 _value
  //   type: String,
  //   default: "",
  // },
};
export type BaseSelectProps = Partial<ExtractPropTypes<typeof props>>;

export default defineComponent({
  name: "RemoteSearch",
  props,
  setup(props: BaseSelectProps, { attrs, expose }) {
    const options: any = ref([]);
    const copyOptions: any = ref([]);
    const loading = ref(false);
    const collapse = ref(true);

    const setData = (list: any) => {
      options.value = list;
      copyOptions.value = [...list];
    };

    const updateData = (params = {}) => {
      let _headers = { ...props.requestHeaders };
      if (typeof props.requestHeaders === "function") {
        _headers = props.requestHeaders();
      }
      if (!collapse.value) {
        return;
      }
      const _params = {
        ...props.defaultParams,
        ...props.requestParams,
        ...params,
      };
      try {
        request
          .request({
            url: props.url,
            method: props.method,
            params: _params,
            data: JSON.stringify(_params),
            headers: _headers,
          })
          .then((res: any) => {
            if (props.dataCallback) {
              options.value = props.dataCallback(res);
              copyOptions.value = [...options.value];
              return;
            }
            if (Array.isArray(res)) {
              setData(res);
            } else {
              options.value = props.resultKey && res[props.resultKey];
              copyOptions.value = props.resultKey && [...res[props.resultKey]];
            }
          });
      } catch (error) {
        console.error("获取数据失败", error);
      }
    };

    const callRequestApi = async (keywords?: string) => {
      if (props.requestApi) {
        try {
          const list = await props.requestApi(keywords);
          setData(list);
          loading.value = false;
        } catch (error) {
          console.error("请求报错", error);
        }
      }
    };

    // 一次性获取所有数据,不需要动态搜索
    if (props.requestAuto && props.url && !props.isRemoteSearch) {
      updateData(props.requestParams);
    } else if (props.requestAuto && props.requestApi && !props.isRemoteSearch) {
      callRequestApi();
    }
    const remoteMethod = debounce((query: string) => {
      if (query) {
        loading.value = true;
        if (!props.url && props.requestApi) {
          callRequestApi(query);
        } else {
          let params = {};
          props.searchField && (params = { [props.searchField]: query });
          updateData(params);
          loading.value = false;
        }
      } else {
        options.value = [];
      }
    });
    const cusTemplate = (item: any) => {
      if (props.optTemp && typeof props.optTemp === "function") {
        return props.optTemp(item);
      }
      return h("div", { class: "cus-temp" }, [
        // h("span", { style: { color: "#000" } }, props.valueKey && item[props.valueKey]),
        h("span", {}, props.labelKey && item[props.labelKey]),
      ]);
    };

    const getOptions = (params = {}) => {
      options.value = [];
      if (!props.url && props.requestApi) {
        callRequestApi();
      } else {
        updateData(params);
      }
    };

    const clearOptions = () => {
      options.value = [];
      copyOptions.value = [];
    };

    onMounted(() => {
      if (props.getInstance && typeof props.getInstance === "function") {
        props.getInstance(getCurrentInstance());
      }
      if (props.getExposed && typeof props.getExposed === "function") {
        props.getExposed(getCurrentInstance()?.exposed);
      }
    });

    expose({ getOptions, clearOptions });

    return () => {
      return h(
        ElConfigProvider,
        {
          locale: zhCn,
        },
        () =>
          h(
            ElSelect,
            {
              loading: loading.value,
              "value-key": props.valueKey,
              remote: false,
              clearable: true,
              filterable: true,
              reserveKeyword: true,
              placeholder: props.isRemoteSearch ? "请输入" : "请选择",
              style: {
                width: props.w,
              },
              ...attrs,
              remoteMethod: remoteMethod,
              onVisibleChange: (value: Boolean) => {
                if (value) {
                  options.value = copyOptions.value;
                }
              },
            },
            () => [
              options.value.map((item: any, index: number) => {
                return h(
                  ElOption,
                  {
                    key: index,
                    label: props.labelKey && item[props.labelKey],
                    value: props.modelItem ? item : props.valueKey && item[props.valueKey],
                  },
                  {
                    default: () => cusTemplate(item),
                  }
                );
              }),
            ]
          )
      );
    };
  },
});
</script>

<style lang="scss">
.cus-temp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
</style>
