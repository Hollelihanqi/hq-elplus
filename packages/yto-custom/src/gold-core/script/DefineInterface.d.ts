export interface IPoint {
    row: any;
    column: any;
    disabled?: boolean;
}
export interface IOptionEqual {
    /**
     * 唯一键
     */
    uniqueKey?: string | object;
    useContent?: boolean;
}
/**
 * 选项：合并选项
 */
export interface IOptionAssign {
    /**
     * 合并层级
     */
    level?: number;
    /**
     * 深度合并
     */
    deep?: boolean;
    /**
     * 严格模式
     */
    strict?: boolean;
    /**
     * 唯一键
     */
    uniqueKey?: string | object;
    ignoreEmpty?: boolean;
    /**
     * 排除键
     */
    ignoreKey?: string[];
}
/**
 * clone 之 option
 */
export interface IOptionClone {
    deep?: boolean;
    exclude?: string[];
}
/**
 * 常规操作Api 接口名称
 */
export interface IApi {
    insert?: string;
    remove?: string;
    detail?: string;
    update?: string;
    list?: string;
    page?: string;
    batchRemove?: string;
    download?: string;
    upload?: string;
    [key: string]: string;
}
