/*
 * @Description: 配置主题色
 * @Author: ym
 * @Date: 2023-08-31 14:28:48
 * @LastEditTime: 2023-11-23 20:39:12
 */
function color(variable) {
  return (val) => {
    console.debug(val);
    if (val.opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgba(${variable}, ${val.opacityValue})`;
  };
}
module.exports = {
  theme: {
    extend: {
      colors: {
        // primary: 'var(--el-color-primary)',
        primary: color("var(--el-color-primary-windi)"),
      },
    },
  },
};
