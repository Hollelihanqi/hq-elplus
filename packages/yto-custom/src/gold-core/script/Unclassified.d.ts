import { EnumDirection, EnumFormat, EnumOrder } from './DefineEnum';
import { IOptionAssign, IOptionClone, IOptionEqual } from './DefineInterface';
/**
 * 数组排序
 * @param target 要排序的数组
 * @param callback 排序的转换回调
 * @param order 排序方式, 默认：EnumOrder.ASC
 * @returns
 */
export declare function sorting<T>(target: T[], callback: (a: any) => void, order?: EnumOrder): T[];
/**
 * 字符串加密
 * @param target 目标字符串
 * @returns
 */
export declare function encryption(target: string): string;
/**
 * 字符串加密
 * @param target 目标字符串
 * @returns
 */
export declare function decryption(target: string): string;
/**
 * 在对象内找元素
 * @param target 目标对象
 * @param path 路径
 * @returns
 */
export declare function findPath(target: any, path: string): string;
/**
 * 清空数组 or 对象
 * @param target
 */
export declare function clearEmpty<T>(target: T): T;
/**
  * 生成 UUID
  */
export declare function UUID(): string;
/**
 * 数组是否包含某元素
 * @param target
 * @param fn
 * @returns
 */
export declare function includes(target: any[], fn: number | string | ((item: any) => boolean)): boolean;
/**
 * 获取元素某个方向上是否有滚动条
 * @param el html 元素
 * @param direction 方向，默认：EnumDirection.vertical
 * @returns
 */
export declare function hasScrollBar(el: HTMLElement, direction: EnumDirection): boolean;
/**
 * 获取滚动条的宽度
 * @returns
 */
export declare function scrollBarWidth(): number;
/**
 * 字符串化
 * @param target 目标对象
 * @returns
 */
export declare function stringify(target: any, format: EnumFormat): string | object | void;
export declare function stringifyObject(target: object, parentKey?: string): object;
export declare function stringifyArray(target: any[], parentKey?: string): object;
/**
 * 对象化
 * @param target 目标字符串
 * @returns
 */
export declare function parse(target: string): object;
/**
* 获取 Url 参数
* @param {String} key 参数名
* @param {String} search 参数集
*/
export declare function urlParam(key: string, search?: string): string;
/**
 * 获取 body 的高度
 * @returns
 */
export declare function clientHeight(): number;
/**
 * 比较两个对象是否同一个
 * @param target 目标对象
 * @param source 目标对象
 * @param uniqueKey 唯一属性
 * @param useContent 使用值比较
 * @returns
 */
export declare function equal(target: any, source: any, option?: IOptionEqual): boolean;
/**
 * 合并对象
 * <p>option.deep -> 深度合并。</p>
 * <p>option.strict = true 严格模式 -> 相同 Key，类型不同 忽略</p>
 * <p>option.level -> 根据层级进行合并。</p>
 * <p>option.uniqueKey -> object.uniqueKey</p>
 * <p>option.ignoreEmpty -> 忽略空值</p>
 * <p>option.ignoreKey -> 忽略属性</p>
 * @param target 目标对象
 * @param source 源对象
 * @param option 参数
 * @returns
 */
export declare function assignObject(target: object, source: object, option?: IOptionAssign): object;
/**
 * 合并对象
 * <p>option.deep -> 深度合并。</p>
 * <p>option.strict = true 严格模式 -> 相同 Key，类型不同 忽略</p>
 * <p>option.level -> 根据层级进行合并。</p>
 * <p>option.uniqueKey -> object.uniqueKey</p>
 * <p>option.ignoreEmpty -> 忽略空值</p>
 * <p>option.ignoreKey -> 忽略属性</p>
 * @param target 目标对象
 * @param source 源对象
 * @param option 参数
 * @returns
 */
export declare function assignArray(target: any[], source: any[], option?: IOptionAssign): any[];
/**
 * 合并对象
 * <p>option.deep -> 深度合并。</p>
 * <p>option.strict = true 严格模式 -> 相同 Key，类型不同 忽略</p>
 * <p>option.level -> 根据层级进行合并。</p>
 * <p>option.uniqueKey -> object.uniqueKey</p>
 * <p>option.ignoreEmpty -> 忽略空值</p>
 * <p>option.ignoreKey -> 忽略属性</p>
 * @param target 目标对象
 * @param source 源对象
 * @param option 参数
 * @returns
 */
export declare function assign(target: any | any[], source: any | any[], option?: IOptionAssign): any;
/**
 *
 * @param target 目标克隆对象
 * @param option 克隆参数
 * @returns
 */
export declare function clone<T>(target: T, option?: IOptionClone): T;
/**
 * 元素的大小及其相对于视口的位置
 * @param target 目标元素
 * @returns
 */
export declare function clientRect(target: HTMLElement | any): DOMRect;
/**
 * 获取 cookie key 对应的 value
 * @param key 键名称
 * @returns
 */
export declare function cookie(key: string): string;
/**
 * 异常信息
 * @param target 目标
 * @since v0.0.7 以后废弃
 * @deprecated Use `parseMessage('base64')` instead.
 * @returns
 */
export declare function message(target: any): string;
/**
 * 解析：异常信息
 * @param target 目标
 * @returns
 */
export declare function parseMessage(target: any): string;
/**
 * 重定向
 * @param target 目标地址
 * @param location
 */
export declare function sendRedirect(target: string, lct?: Location): void;
