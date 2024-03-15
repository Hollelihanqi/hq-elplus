export * from "./install";
export * from "./props";
import request from "./request";

/**
 * @deprecated 防抖
 * @param {Function} fn 回调函数
 * @param {Number} delay 延迟毫秒数
 */
export const debounce = (fn: (...args: any[]) => any, delay: number = 300) => {
  let timer: any;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      return fn(...args);
    }, delay);
  };
};

export { request };
