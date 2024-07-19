/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-19 16:59:26
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-19 17:00:24
 * @FilePath: \yto-engine\packages\utils\types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// eslint-disable-next-line vue/prefer-import-from-vue
import { isArray, isObject, isString } from "@vue/shared";
import { isNil } from "lodash-unified";

// eslint-disable-next-line vue/prefer-import-from-vue
export { isArray, isFunction, isObject, isString, isDate, isPromise, isSymbol } from "@vue/shared";
export { isVNode } from "vue";

export const isUndefined = (val: any): val is undefined => val === undefined;
export const isBoolean = (val: any): val is boolean => typeof val === "boolean";
export const isNumber = (val: any): val is number => typeof val === "number";

export const isEmpty = (val: unknown) =>
  (!val && val !== 0) || (isArray(val) && val.length === 0) || (isObject(val) && !Object.keys(val).length);

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === "undefined") return false;
  return e instanceof Element;
};

export const isPropAbsent = (prop: unknown): prop is null | undefined => {
  return isNil(prop);
};

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};

export const isWindow = (val: unknown): val is Window => {
  return val === window;
};
