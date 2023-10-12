import { Ref } from 'vue';
export interface IOptionTabPane {
    /**
     * 唯一编码：默认值 = origin + pathname + hash
     */
    code?: string;
    target?: string;
    mode?: string;
    closable?: boolean;
    refresh?: boolean;
    label: string;
    href?: string;
    children?: IOptionTabPane[];
}
export interface IOptionFrame {
    /**
     * 缓存页签：刷新页面缓存最后一次激活的页签
     */
    cacheable?: boolean;
    sso?: boolean;
    /**
     * 最大页签数：超过最大值，自动删除第一个可关闭的页签
     */
    max?: number;
}
export interface IFrame {
    listRoute: Ref<IOptionTabPane[]>;
    activate: Ref<string>;
}
/**
 * 增加 Tab 页签
 * @param href 页面地址
 * @param option 参数
 */
export declare function tabPaneAdd(href: string, option?: IOptionTabPane): void;
/**
 * 关闭页签
 * @param code 页签编码
 */
export declare function tabPaneClose(code: string | number): void;
export declare function useFrame(option: IOptionFrame): IFrame;
