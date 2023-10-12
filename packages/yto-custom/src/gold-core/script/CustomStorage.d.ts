/**
 * Storage Option
 */
export interface IOptionStorage<T> {
    encrypt?: boolean;
    defaultValue?: T;
}
/**
 * Storage 工具类
 */
declare class CustomStorage {
    private __storage;
    constructor(storage: Storage);
    /**
     * storage 通过 Key 存储
     * @param key storage key
     * @param option { defaultValue：'默认值' }
     * @returns 返回目标
     */
    get<T>(key: string, option?: IOptionStorage<T>): T;
    /**
     * storage set value
     * @param key storage key
     * @param value storage value
     * @param option IOptionStorage 参数
     * @returns
     */
    set<T>(key: string, value: T, option?: IOptionStorage<T>): void;
    clear(): void;
    remove(key: string): void;
    /**
     * 向 keyRoot 对象追加 { [key]: value}
     * @param key storage key
     * @param attribute 属性名
     * @param value 属性值
     * @param option IOptionStorage 参数
     * @returns
     */
    put<T>(key: string, attribute: string, value: T, option?: IOptionStorage<T>): void;
    /**
     * 获取 Map 元素
     * @param key storage key
     * @param attribute map key
     * @returns map value
     */
    getAttribute<T>(key: string, attribute: string, option?: IOptionStorage<T>): T;
}
/**
 * Storage local 本地存储
 */
export declare const local: CustomStorage;
/**
 * Storage session 会话存储
 */
export declare const session: CustomStorage;
export {};
