import { EnumConsole } from './DefineEnum';
/**
 * 控制台异常
 */
export declare class ErrorConsole extends Error {
    private __type;
    /**
     * 控制台异常构造
     * @param message 异常信息
     * @param type 控制台类型
     */
    constructor(message: string, type?: EnumConsole);
    /**
     * 获取控制台类型
     */
    get type(): EnumConsole;
}
/**
 * 视图异常
 */
export declare class ErrorView extends Error {
    constructor(message: string);
}
