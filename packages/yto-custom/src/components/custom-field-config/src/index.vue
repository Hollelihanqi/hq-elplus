<!--
 * @Description: 自定义输入框
 * @Author: ym
 * @Date: 2023-12-07 16:20:35
 * @LastEditTime: 2024-03-18 13:18:21
-->
<script lang="tsx">
import { defineComponent, PropType, resolveComponent, h } from "vue";
import { ElInput, ElSelectV2 } from "element-plus";
interface IAnyObject {
  [key: string]: any;
}
export interface FieldConfig extends IAnyObject {
  elType?: string;
  props: string;
  options?: IAnyObject[];
  disabled?: boolean;
}
export default defineComponent({
  name: "CustomFieldConfig",
  components: {
    ElInput,
    ElSelectV2,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    fieldConfig: {
      type: Object as PropType<FieldConfig>,
      required: false,
    },
    operatorConfig: {
      type: Object as PropType<FieldConfig>,
      required: false,
    },
    valueConfig: {
      type: Object as PropType<FieldConfig>,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
    ruleProp: {
      type: String,
      required: false,
    },
    rules: {
      type: Function,
      required: false,
    },
    optionWidth: {
      type: String,
      required: false,
    },
  },
  emits: ["cbChange", "update:modelValue"],
  setup(props, { slots, emit }) {
    const nameConfig: IAnyObject = { fieldConfig: "field", operatorConfig: "operator", valueConfig: "value" };
    const itemRender = (key: string) => {
      // @ts-ignore:
      const _itemConfig = props[key];
      const slotsFun = nameConfig[key] ? slots[nameConfig[key]] : null;
      if (slotsFun) {
        return slotsFun();
      } else if (_itemConfig.elType) {
        const tmpProps = { ..._itemConfig };
        delete tmpProps.props; //props字段与selectV2冲突
        return h(resolveComponent("el-" + _itemConfig.elType), {
          modelValue: props.modelValue[_itemConfig.props],
          "onUpdate:modelValue": (val: any) => {
            props.modelValue[_itemConfig.props] = val;
            emit("cbChange", _itemConfig.props, val);
          },
          class: `${key === "operatorConfig" ? "" : "flex-1"} ${nameConfig[key]}-view`,
          // style: `width:${key === 'operatorConfig' ? props.optionWidth || '100px' : 'auto'}`,
          style: "width:" + (key === "operatorConfig" ? props.optionWidth || "100px" : "auto"),
          disabled: props.disabled || _itemConfig.disabled || false,
          ...tmpProps,
        });
      }
    };
    const rowRender = () => {
      const _domConfigs = ["fieldConfig", "operatorConfig", "valueConfig"];
      return (
        <div class="custom-field-config-row w-full flex items-center border">
          {_domConfigs.map((e) => itemRender(e))}
        </div>
      );
    };
    return () => (
      <div>
        {props.rules ? (
          <el-form-item prop={props.ruleProp || ""} rules={props.rules(props.modelValue)}>
            {rowRender()}
          </el-form-item>
        ) : (
          rowRender()
        )}
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
:deep(.custom-field-config-row) {
  .el-select-v2__wrapper,
  .el-input__inner,
  .el-input__wrapper.is-focus,
  .el-select__wrapper,
  .el-input__wrapper {
    box-shadow: none !important;
    border: none !important;
  }
  .el-select {
    --el-select-input-focus-border-color: transparent;
  }
  // :has(> .is-error) {
  //   border: 1px solid #f00;
  // }
}
:deep(.el-form-item) {
  margin-bottom: 0px !important;
}
:deep(.is-error) {
  .custom-field-config-row {
    border: 1px solid #f00;
  }
}
.is-error {
  & {
    border-color: red !important;
  }
}
:deep(.value-view) {
  .el-input__inner {
    text-align: right;
  }
}
</style>
