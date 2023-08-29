<script lang="ts">
import { defineComponent, h, ref } from "vue";
import { ElSelect, ElOption } from "element-plus";
import { request, debounce } from "@/_utils";
import type { ExtractPropTypes } from "vue";

const props = {
  // baseURL: {
  //   type: String,
  //   default: "/api",
  // },
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
  setup(props: BaseSelectProps, { attrs }) {
    const {
      url,
      method,
      resultKey,
      dataCallback,
      searchField,
      requestAuto,
      isRemoteSearch,
      requestParams,
      optTemp,
      labelKey,
      valueKey,
      w,
      modelItem,
    } = props as any;
    const options: any = ref([]);
    const copyOptions: any = ref([]);
    const loading = ref(false);
    const collapse = ref(true);
    const updateData = (params = {}) => {
      let _headers = { ...props.requestHeaders };
      if (typeof props.requestHeaders === "function") {
        _headers = props.requestHeaders();
      }
      if (!collapse.value) {
        return;
      }
      const _params = {
        ...requestParams,
        ...params,
      };
      try {
        request
          .request({
            url,
            method,
            params: _params,
            data: JSON.stringify(_params),
            headers: _headers,
          })
          .then((res: any) => {
            if (dataCallback) {
              options.value = dataCallback(res);
              copyOptions.value = [...options.value];
              return;
            }
            if (Array.isArray(res)) {
              options.value = res;
              copyOptions.value = [...res];
            } else {
              options.value = resultKey && res[resultKey];
              copyOptions.value = resultKey && [...res[resultKey]];
            }
          });
      } catch (error) {
        console.error("获取数据失败", error);
      }
    };

    // 一次性获取所有数据,不需要动态搜索
    if (requestAuto && url && !isRemoteSearch) {
      updateData(requestParams);
    } else if (requestAuto && props.requestApi && !url && !isRemoteSearch) {
      const list = props.requestApi();
      options.value = list;
      copyOptions.value = [...list];
    }
    const remoteMethod = debounce(async (query: string) => {
      if (query) {
        loading.value = true;
        let params = {};
        searchField && (params = { [searchField]: query });
        updateData(params);
        loading.value = false;
      } else {
        options.value = [];
      }
    });

    const cusTemplate = (item: any) => {
      if (optTemp && typeof optTemp === "function") {
        return optTemp(item);
      }
      return h("div", { class: "cus-temp" }, [
        // h("span", { style: { color: "#000" } }, props.valueKey && item[props.valueKey]),
        h("span", {}, labelKey && item[labelKey]),
      ]);
    };

    watch(
      () => props.requestParams,
      (newValue) => {
        updateData({ ...newValue });
      },
      {
        deep: true,
      }
    );
    
    return () => {
      return h(
        ElSelect,
        {
          loading: loading.value,
          "value-key": valueKey,
          remote: false,
          clearable: true,
          filterable: true,
          reserveKeyword: true,
          placeholder: isRemoteSearch ? "请输入" : "请选择",
          style: {
            width: w,
          },
          ...attrs,
          remoteMethod: remoteMethod,
          onVisibleChange: (value: Boolean) => {
            if (value) {
              collapse.value = true;
              options.value = copyOptions.value;
            } else {
              collapse.value = false;
            }
          },
        },
        () => [
          options.value.map((item: any, index: number) => {
            return h(
              ElOption,
              {
                key: index,
                label: labelKey && item[labelKey],
                value: modelItem ? item : valueKey && item[valueKey],
              },
              {
                default: () => cusTemplate(item),
              }
            );
          }),
        ]
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
