# TextEllipsis

显示长文本的省略号并支持展开或折叠文本。

## 基本使用

:::demo 默认显示一行

text-ellipsis/basic

:::

## 展开/收起

:::demo 支持展开/折叠

text-ellipsis/expandAndCollapse

:::

## 自定义行

:::demo 通过设置 rows 来显示`rows`的数量

text-ellipsis/customizeRows

:::

## 自定义折叠位置

:::demo 折叠内容的开头部分

text-ellipsis/customizeCollapseStart

:::

:::demo 折叠内容的中间部分

text-ellipsis/customizeCollapseMiddle

:::

## 自定义操作

:::demo 使用`action`插槽来自定义操作

text-ellipsis/customizeAction

:::

## TextEllipsis API

### TextEllipsis 属性

| 属性名        | 说明                        | 类型               | 默认值  |
| ------------- | --------------------------- | ------------------ | ------- |
| rows          | 显示行数                    | _number \| string_ | `1`     |
| content       | 显示的文字                  | _string_           | -       |
| expand-text   | 展开操作文本                | _string_           | -       |
| collapse-text | 收起操作文本                | _string_           | -       |
| dots          | 省略号的文字内容            | _string_           | `'...'` |
| position      | 可以设置为` start``middle ` | _string_           | `'end'` |

### TextEllipsis 插槽

| 插槽名 | 说明       | 参数                    |
| ------ | ---------- | ----------------------- |
| action | 自定义动作 | _{ expanded: boolean }_ |

### TextEllipsis 实例方法

| 方法名 | 说明         | Attribute            | 返回值 |
| ------ | ------------ | -------------------- | ------ |
| toggle | 切换扩展状态 | _expanded?: boolean_ | -      |

### TextEllipsis 事件

| 事件名       | 说明                | 类型                |
| ------------ | ------------------- | ------------------- |
| click-action | 单击展开/折叠时发出 | _event: MouseEvent_ |

### 类型

该组件导出以下类型定义：

```ts
import type { TextEllipsisProps, TextEllipsisInstance, TextEllipsisThemeVars } from "@yto/custom";
```

`TextEllipsisInstance` 是组件实例的类型：

```ts
import { ref } from "vue";
import type { TextEllipsisInstance } from "@yto/custom";

const textEllipsisRef = ref<TextEllipsisInstance>();

textEllipsisRef.value?.toggle();
```