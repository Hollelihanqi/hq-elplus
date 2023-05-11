# 组件库介绍

本组件库是基于 Element-Plus 进行封装符合自己业务需求的业务组件库，以及常用 Element-Plus 组件的二次封装。

# 开发规范

## 组件创建
* 进入 packages/yto-custom/src/components 目录
* 创建组件目录 xxx (小写开头，例如：table)
* 组件目录结构
  * xxx/index.ts 组件主入口
  * xxx/src 组件核心代码
  * xxx/src/index.vue 组件代码入口
  * xxx/src/instance.ts 组件 Type 声明
  * xxx/src/components/ 主组件依赖的公共组件



## 组件命名
大驼峰命名：Menu
```
     <script lang="ts" setup name="Menu"></script>

     <script>
        export default defineComponent({
            name: "Menu",
        })
     </script>
```

