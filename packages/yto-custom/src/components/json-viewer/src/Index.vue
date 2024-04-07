<script lang="tsx">
import { Props } from "./props";
import { useController } from "./useControl";
export default defineComponent({
  name: "JsonViewer",
  props: Props,
  setup(props) {
    const { _nodes, handleCopyClick } = useController(props);
    // const _nodes = ref(jsonToNestedArray(props.vjson))
    console.log("_nodes", _nodes.value);
    const paseKey = (key: string) => {
      const keys = key.split(".");
      return keys[keys.length - 1];
    };
    const _colors = ["#2f54eb", "#722ed1", "#eb2f96", "#fa541c", "#fa8c16"];
    const valueFormat = (node: any) => {
      if (node.value === null) {
        return <span class="jv-n">null</span>;
      } else if (node.type === "string") {
        return <span class="jv-greed">{JSON.stringify(node.value)}</span>;
      } else if (node.type === "number" || node.type === "boolean") {
        return <span class="jv-red">{node.type === "boolean" ? String(node.value) : node.value}</span>;
      }
    };

    const toggleExpand = (e: Event, node: any) => {
      e.stopPropagation(); // 阻止事件冒泡
      const hasChildren = node._children && node._children.length > 0;
      node.collapse = !node.collapse;
    };

    const isCollapsed = ref(false);
    const toggleRoot = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    // 定义一个箭头组件，用于显示展开和收起的状态
    const CollapseArrow = ({ isCollapsed }: any) => (
      <div
        style={{ cursor: "pointer", display: "inline-block", ...dstyles(isCollapsed) }}
        class={`color-f ${isCollapsed ? "triangle-right" : "triangle-down"}`}
      ></div>
    );

    const dstyles = (isCollapsed: boolean) => {
      return isCollapsed
        ? {
            borderLeftColor: props.expandColor,
          }
        : {
            borderTopColor: props.expandColor,
          };
    };
    // 渲染单个节点的组件
    const JsonNode = ({ node }: any) => {
      let _node = node;
      // 渲染节点内容
      const renderNode = (key: string, value: any, children: [], type: string, index = 0) => {
        if ((type === "object" || type === "array") && value !== null) {
          return (
            <div onClick={(e: Event) => toggleExpand(e, node)}>
              <CollapseArrow isCollapsed={node.collapse} />
              <div style="display:inline-block;word-break: break-all;">
                <span>{paseKey(key)}</span>
                <span> : </span>
                <strong style={{ color: _colors[index] }}>{type === "object" ? "{" : "["}</strong>
              </div>
              {node.collapse ? "..." : ""}
              {!node.collapse && (
                <div style={{ marginLeft: "20px" }}>
                  {children.map((child: any, index) => {
                    _node = child;
                    return (
                      <div key={index}>{renderNode(child.key, child.value, child._children, child.type, index)}</div>
                    );
                  })}
                </div>
              )}
              <span style={{ color: _colors[index] }}>
                <strong style={{ color: _colors[index] }}>{type === "object" ? "}" : "]"}</strong>
              </span>
            </div>
          );
        } else {
          return (
            <div style="display:inline-block;word-break: break-all;">
              <span class="json-key-span" style="display:inline-block">
                {paseKey(key)}
              </span>
              <span> : </span>
              {valueFormat(_node)}
            </div>
          );
        }
      };

      return <div>{renderNode(node.key, node.value, node._children, node.type)}</div>;
    };
    // 根组件，渲染整个JSON树
    const JsonTree = (data = []) => {
      return (
        <div>
          <div onClick={toggleRoot}>
            <CollapseArrow isCollapsed={isCollapsed.value} />
            <span class="json-key-span">{props.rootKey}</span>
          </div>
          {!isCollapsed.value && (
            <div style={{ marginLeft: "20px" }}>
              {data.map((node, index) => (
                <JsonNode node={node} />
              ))}
            </div>
          )}
        </div>
      );
    };

    // 搜索
    const JsonSearch = () => {
      return (
        <div class="json-search">
          <input placeholder={props.splacholder} />
        </div>
      );
    };

    return () => {
      return (
        <div class={`json-viewer ${props.theme === "light" ? "json-viewer-light" : "json-viewer-dark"}`}>
          {props.copy && (
            <div class="json-copy" onClick={handleCopyClick}>
              复制
            </div>
          )}
          {/* {JsonSearch()} */}
          {JsonTree(_nodes.value)}
        </div>
      );
    };
  },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>
