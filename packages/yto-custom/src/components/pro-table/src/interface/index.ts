import { InputProps, ElSelect, SwitchProps, TimePickerDefaultProps, CheckboxProps } from "element-plus";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { TimeSelectProps } from "element-plus/es/components/time-select/src/time-select";
import { BreakPoint, Responsive } from "../components/Grid/interface";
import type { BaseSelectProps } from "../components/SearchForm/components/BaseSelect.vue";
export namespace Table {
  export interface Pageable {
    page?: number;
    size?: number;
    total: number;
  }
  export interface TableStateProps {
    tableData: any[];
    pageable: Pageable;
    searchParam: {
      [key: string]: any;
    };
    searchInitParam: {
      [key: string]: any;
    };
    totalParam: {
      [key: string]: any;
    };
    icon?: {
      [key: string]: any;
    };
  }
}

export interface EnumProps {
  label: string; // 选项框显示的文字
  value: any; // 选项框值
  disabled?: boolean; // 是否禁用此选项
  tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any;
}

export type TypeProp = "index" | "selection" | "expand";

interface FormControlProps {
  placeholder?: string;
}
interface Input {
  el: "input";
  props?: Partial<InputProps>;
}
interface Select {
  el: "select";
  props?: Partial<typeof ElSelect.__defaults> | FormControlProps;
}

interface TreeSelect {
  el: "tree-select";
  props?: any;
}

interface DatePicker {
  el: "date-picker";
  props?: any;
}

interface TimePicker {
  el: "time-picker";
  props?: Partial<TimePickerDefaultProps>;
}

interface TimeSelect {
  el: "time-select";
  props?: Partial<TimeSelectProps>;
}

interface Switch {
  el: "switch";
  props?: Partial<SwitchProps>;
}
interface Checkbox {
  el: "checkbox";
  props?: Partial<CheckboxProps>;
}

export type BaseSearch = {
  key?: string; // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  label?: string; // form-item label
  remote?: boolean; // 是否远程搜索
  remoteProps?: BaseSelectProps; // 是否远程搜索
  order?: number; // 搜索项排序（从大到小）
  span?: number; // 搜索项所占用的列数，默认为1列
  offset?: number; // 搜索字段左侧偏移列数
  defaultValue?: string | number | boolean | any[]; // 搜索项默认值
} & Partial<Record<BreakPoint, Responsive>>;

export type SearchProps = BaseSearch &
  (Input | Select | DatePicker | TimePicker | TimeSelect | Switch | TreeSelect | Checkbox);

export interface ColumnProps<T = any>
  extends Partial<Omit<TableColumnCtx<T>, "children" | "renderHeader" | "renderCell">> {
  tag?: boolean; // 是否是标签展示
  isShow?: boolean; // 是否显示在表格当中
  search?: SearchProps; // 搜索项配置
  enum?: EnumProps[] | ((params?: any) => Promise<any>); // 枚举类型（渲染值的字典）
  isFilterEnum?: boolean; // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
  fieldNames?: { label: string; value: string }; // 指定 label && value 的 key 值
  headerRender?: (row: ColumnProps) => any; // 自定义表头内容渲染（tsx语法）
  render?: (scope: { row: T }) => any; // 自定义单元格内容渲染（tsx语法）
  _children?: ColumnProps<T>[]; // 多级表头
  [propsName: string]: any;
}
