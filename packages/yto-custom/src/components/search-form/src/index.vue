<script lang="tsx">
import { PropType, defineComponent, ref, computed } from "vue";
import { SearchFormControlProps } from "./interface";
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import Grid from "./components/Grid/index.vue";
import GridItem from "./components/Grid/components/GridItem.vue";
import SearchFormItem from "./components/SearchFormItem.vue";

export default defineComponent({
  name: "SearchForm",
  props: {
    searchModel: {
      type: Object,
      default: () => ({}),
    },
    colConfig: {
      type: [Number, Object],
    },
    formControls: {
      type: Array as PropType<SearchFormControlProps[]>,
      default: () => [],
    },
    modelDefault: {
      type: Object,
      default: null,
    },
    okpos: {
      type: String,
      default: "right",
    },
  },
  emits: ["update:searchModel", "on-search", "on-reset"],
  setup(props, { emit, expose, slots }) {
    const collapsed = ref(false);
    const _searchModel = computed({
      get() {
        return props.searchModel;
      },
      set(model) {
        emit("update:searchModel", model);
      },
    });

    const resetField = (field: string, value = "") => {
      const newModle: any = { ..._searchModel.value };
      newModle[field] = value;
      emit("update:searchModel", newModle);
    };

    const getFormatValues = () => {
      return props.formControls.reduce((acc: any, item: SearchFormControlProps) => {
        const { field, formatValue } = item as any;
        // const value = acc[field];
        // acc[field] = formatValue && typeof formatValue === "function" ? formatValue(value) : value;
        // 只处理那些有 formatValue 函数的属性
        if (typeof formatValue === "function") {
          const value = _searchModel.value[field];
          // 只添加那些经过formatValue处理的属性到累加器对象中
          acc[field] = formatValue(value);
        }
        return acc;
      }, {});
    };

    // 获取响应式设置
    const getResponsive = (control: SearchFormControlProps, index: number) => {
      return {
        span: control?.span,
        offset: control?.offset ?? 0,
        xs: control?.xs,
        sm: control?.sm,
        md: control?.md,
        lg: control?.lg,
        xl: control?.xl,
        index,
      };
    };

    // 处理默认值
    const handleDefaultValue = () => {
      const _dv: any = {};
      if (props.modelDefault) {
        for (const [key, value] of Object.entries(props.modelDefault)) {
          _dv[key] = typeof value === "function" ? value() : value;
        }
      }
      for (const item of props.formControls) {
        if (item.field && item.defaultValue) {
          _dv[item.field] = typeof item.defaultValue === "function" ? item.defaultValue() : item.defaultValue;
        }
      }
      emit("update:searchModel", _dv);
    };

    const isDefaultValue = () => {
      if (props.modelDefault) {
        return true;
      } else {
        return props.formControls.some((item: any) => item.defaultValue);
      }
    };

    const handleReset = () => {
      handleDefaultValue();
      emit("on-reset");
    };
    const handleQuery = () => {
      emit("on-search", { ..._searchModel.value });
    };

    expose({ resetField, getFormatValues, handleDefaultValue });

    onMounted(() => {
      isDefaultValue() && handleDefaultValue();
    });

    return () => {
      return props?.formControls?.length ? (
        <div class="search-form-w bg-white px-[16px] pt-[16px] rounded-[4px]">
          <el-form model={_searchModel.value} class="search-form" label-width="auto">
            <Grid ref="GridInstance" collapsed={collapsed.value} gap={[16, 0]} cols={props.colConfig}>
              {props.formControls.map((control, index) => {
                return (
                  <GridItem key={control.field} {...getResponsive(control, index)}>
                    <el-form-item label={control.label}>
                      {control.field ? (
                        <SearchFormItem
                          v-model={_searchModel.value[control.field]}
                          control={control}
                          cslot={slots[control.field]}
                        />
                      ) : null}
                    </el-form-item>
                  </GridItem>
                );
              })}
              <GridItem suffix>
                <div class="search-action-box flex items-center justify-end mb-[16px]">
                  {props.okpos === "right" ? (
                    <>
                      <el-button onClick={handleReset}>重置</el-button>
                      <el-button type="primary" onClick={handleQuery}>
                        查询
                      </el-button>
                    </>
                  ) : (
                    <>
                      <el-button type="primary" onClick={handleQuery}>
                        查询
                      </el-button>
                      <el-button onClick={handleReset}>重置</el-button>
                    </>
                  )}
                  <el-button type="primary" link onClick={() => (collapsed.value = !collapsed.value)}>
                    {collapsed.value ? "展开" : "收起"}
                    <el-icon>{collapsed.value ? <ArrowDown /> : <ArrowUp />}</el-icon>
                  </el-button>
                </div>
              </GridItem>
            </Grid>
          </el-form>
        </div>
      ) : null;
    };
  },
});
</script>
