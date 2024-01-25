# 水印

安装依赖

```
pnpm install  @yto/utils

```

## 导入水印

```typescript
import { addWaterMarker, removeWatermark } from "@yto/utils";
```

### 添加水印

```typescript
addWaterMarker({ text: "张三 2024-1-25" });
```

### 移除水印

```typescript
removeWatermark();
```

### options 配置项

| 属性名        | 说明            | 类型               | 可选值 | 默认值                     | 备注 |
| ------------- | --------------- | ------------------ | ------ | -------------------------- | ---- |
| `text`        | 水印显示文字    | String             | 必传   | -                          |      |
| `elNode`      | 水印挂载元素    | String/HtmlElement | -      | document.body              |      |
| `font`        | 字体大小样式    | String             | -      | '16px Microsoft JhengHei'  |      |
| `fillStyle`   | 字体填充颜色    | String             | -      | 'rgba(180, 180, 180, 0.3)' |      |
| `rotateAngle` | 文字旋转角度    | Number             | -      | (-20 \* Math.PI) / 180     |      |
| `fillX`       | 文字绘制 X 坐标 | Number             | -      | 20                         |      |
| `fillY`       | 文字绘制 Y 坐标 | Number             | -      | 75                         |      |
