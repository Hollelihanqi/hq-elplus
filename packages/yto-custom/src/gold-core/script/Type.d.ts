import { EnumType } from './DefineEnum';
/**
 * 获取目标的数据类型
 * @param target 目标
 * @returns
 */
export declare function getType(target: any): EnumType;
/**
 * 判断：是否为 Date
 * @param target 目标
 * @returns
 */
export declare function isDate(target: any): boolean;
/**
 * 判断：是否为 File
 * @param target 目标
 * @returns
 */
export declare function isFile(target: any): boolean;
/**
 * 判断：是否为 Blog
 * @param target 目标
 * @returns
 */
export declare function isBlog(target: any): boolean;
/**
 * 判断：是否为 boolean
 * @param target 目标
 * @returns
 */
export declare function isBoolean(target: any): boolean;
/**
 * 判断：是否为 number
 * @param target 目标
 * @returns
 */
export declare function isNumber(target: any): boolean;
/**
 * 判断：是否为 string
 * @param target 目标
 * @returns
 */
export declare function isString(target: any): boolean;
/**
 * 判断：是否为 object or array
 * @param target 目标
 * @returns
 */
export declare function isObjectOrArray(target: any): boolean;
/**
 * 判断：是否为 object
 * @param target 目标
 * @returns
 */
export declare function isObject(target: any): boolean;
/**
 * 判断：是否为 array
 * @param target 目标
 * @returns
 */
export declare function isArray(target: any): boolean;
/**
 * 判断：是否为 regExp
 * @param target 目标
 * @returns
 */
export declare function isRegExp(target: any): boolean;
/**
 * 判断：是否为 function
 * @param target 目标
 * @returns
 */
export declare function isFunction(target: any): boolean;
/**
 * 判断：是否为 async function
 * @param target 目标
 * @returns
 */
export declare function isAsyncFunction(target: any): boolean;
/**
 * 判断：是否为 promise
 * @param target 目标
 * @returns
 */
export declare function isPromise(target: any): boolean;
/**
 * 判断：是否为 error
 * @param target 目标
 * @returns
 */
export declare function isError(target: any): boolean;
