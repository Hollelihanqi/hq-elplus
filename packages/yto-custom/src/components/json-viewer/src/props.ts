import type { ExtractPropTypes, PropType } from "vue";
export const Props = {
  data: {
    type: [Object],
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  copy: {
    type: Boolean,
    default: true,
  },
  expandDepth: {
    type: Number,
    default: 1,
  },
  theme: {
    type: String,
    default: "light",
  },
  rootKey: {
    type: String,
    default: "Root",
  },
  hideSearch: {
    type: Boolean,
    default: false,
  },
  splacholder: {
    type: String,
    default: "请输入 key 或者 value 进行搜索",
  },
  expandColor: {
    type: String,
    default: "#824c96",
  },
};

export type JsonViewerProps = ExtractPropTypes<typeof Props>;
