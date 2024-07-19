# TextEllipsis

### 功能

显示长文本的省略号并支持展开或折叠文本。

## Usage

### 基本使用

默认显示一行。

<demo src="./basic.vue"></demo>

### 展开/收起

支持展开/折叠。

<demo src="./expandAndCollapse.vue"></demo>

### 自定义行

通过设置 rows 来显示`rows`的数量。

<demo src="./customizeRows.vue"></demo>

### 自定义折叠位置

- 折叠内容的开头部分：

<demo src="./customizeCollapseStart.vue"></demo>

- 折叠内容的中间部分:

<demo src="./customizeCollapseMiddle.vue"></demo>

### 自定义操作

使用`action`插槽来自定义操作。

<demo src="./customizeAction.vue"></demo>

## API

### Props

| Attribute     | Description                 | Type               | Default |
| ------------- | --------------------------- | ------------------ | ------- |
| rows          | 显示行数                    | _number \| string_ | `1`     |
| content       | 显示的文字                  | _string_           | -       |
| expand-text   | 展开操作文本                | _string_           | -       |
| collapse-text | 收起操作文本                | _string_           | -       |
| dots          | 省略号的文字内容            | _string_           | `'...'` |
| position      | 可以设置为` start``middle ` | _string_           | `'end'` |

### Events

| Event        | Description         | Arguments           |
| ------------ | ------------------- | ------------------- |
| click-action | 单击展开/折叠时发出 | _event: MouseEvent_ |

### Methods

| Name   | Description  | Attribute            | Return value |
| ------ | ------------ | -------------------- | ------------ |
| toggle | 切换扩展状态 | _expanded?: boolean_ | -            |

### Slots

| Name   | Description | SlotProps               |
| ------ | ----------- | ----------------------- |
| action | 自定义动作  | _{ expanded: boolean }_ |

### Types

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
