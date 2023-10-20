<!--
 * @Author: weichunpei
 * @Date: 2023-10-20 09:30:23
 * @LastEditors: weichunpei
 * @LastEditTime: 2023-10-20 10:25:14
 * @Description: layoutHeader 组件
-->

# layoutHeader

用于职能类后台管理项目布局的头部组件。

### 功能

- 支持全屏
- 支持折叠

## 基本使用

<demo src="./basic.vue"></demo>

### layoutHeader 属性

| 属性名     | 说明      | 类型                                | 可选值 | 默认值 | 备注 |
| ---------- | --------- | ----------------------------------- | ------ | ------ | ---- |
| `title`    | 系统名称  | string                              | -      | ""     |      |
| `collapse` | 是否折叠  | boolean                             | -      | false  |      |
| `width`    | 系统 logo | Img                                 | —      | -      |      |
| `userInfo` | 用户信息  | `{userName:string,userCode:string}` | —      |        |

### layoutHeader 事件

| 属性名       | 说明     | 类型     |
| ------------ | -------- | -------- |
| `logout`     | 退出登录 | Function |
| `collapse`   | 折叠     | Function |
| `fullscreen` | 全屏     | Function |

### layoutHeader 插槽

| 属性名    | 说明                 |
| --------- | -------------------- |
| `default` | 折叠按钮区域插槽     |
| `left`    | 左侧 title 区域插槽  |
| `right`   | 右侧用户信息区域插槽 |
