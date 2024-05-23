import { JsonViewerProps } from "./interface";
import { ElMessage } from "element-plus";
export const useController = (props: JsonViewerProps) => {
  const _nodes = ref([]);
  const isCollapsed = ref(false);
  const toggleRoot = () => {
    isCollapsed.value = !isCollapsed.value;
  };
  const copyed = ref(false);
  // 复制
  const handleCopyClick = () => {
    const input = document.createElement("input");
    input.value = JSON.stringify(props.data);
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input);
    copyed.value = true;
    ElMessage.success("复制成功！");
  };

  watchEffect(() => {
    isCollapsed.value = false;
    _nodes.value = jsonToNestedArray(props.data);
  });

  return {
    isCollapsed,
    _nodes,
    handleCopyClick,
    toggleRoot,
  };
};

function jsonToNestedArray(obj: any) {
  // 定义一个帮助函数递归地处理对象和数组，新增一个level参数来表示当前层级
  function processNode(key: any, value: any, path: any, level: any) {
    // 获取完整的路径
    const fullPath = path ? `${path}.${key}` : key;
    // 初始化节点，增加level属性
    const node: any = { key: fullPath, value: "", type: typeof value, _children: [], level: level, collapse: false };

    if (typeof value === "object" && value !== null) {
      // 如果值是一个对象，则为每个子属性创建新的节点
      if (Array.isArray(value)) {
        // 处理数组类型
        node.value = "Array";
        node.type = "array";
        value.forEach((item, index) => {
          node._children.push(processNode(`${key}[${index}]`, item, "", level + 1));
        });
      } else {
        // 处理对象类型
        node.value = "Object";
        node.type = "object";
        Object.entries(value).forEach(([childKey, childValue]) => {
          node._children.push(processNode(childKey, childValue, fullPath, level + 1));
        });
      }
    } else {
      // 如果值不是对象或数组，直接设置值和类型
      node.value = value;
    }
    return node;
  }

  // 处理根对象，根层级设置为0
  const result: any = [];
  Object.entries(obj).forEach(([key, value]) => {
    result.push(processNode(key, value, "", 0));
  });

  return result;
}
