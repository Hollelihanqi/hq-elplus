/**
 * 转换为：数字类型
 * @param target 目标
 * @returns
 */
export declare function toNumber(target: string): number;
/**
 * 转换：小驼峰
 * @param target 目标字符串
 * @param connector 链接字符串，默认 '-'
 * @returns
 */
export declare function toLowerCamelCase(target: string, connector?: string): string;
/**
 * 转换：大驼峰
 * @param target 目标字符串
 * @param connector 链接字符串，默认 '-'
 * @returns
 */
export declare function toUpperCamelCase(target: string, connector?: string): string;
/**
 * 转换：拼接模式
 * @param target 目标字符串
 * @param connector 链接字符串，默认 '-'
 * @returns
 */
export declare function toJoin(target: string, connector?: string): string;
/**
 * 转换：路径格式化、标准化
 * @param target
 * @returns
 */
export declare function toPathFormat(target: string): string;
/**
 * URL 绝对化
 * @param target 目标url
 * @param origin 默认当前环境
 * @returns
 */
export declare function toURL(target: string, origin?: string): URL;
/**
 * 转换：首字母转大写
 * @param {String} target 目标字符串
 * @returns
 */
export declare function toFirstCharUpperCase(target: string): string;
/**
 * 转换：首字母转小写
 * @param {String} 目标字符串
 * @returns
 */
export declare function toFirstCharLowerCase(target: string): string;
