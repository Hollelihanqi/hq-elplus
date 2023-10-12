import { Ref } from 'vue';
export interface IStatus {
    statusAdd: Ref<boolean>;
    statusUpdate: Ref<boolean>;
    statusDetail: Ref<boolean>;
}
export interface IPrimaryKey {
    primaryKeyAdd: Ref<string | number>;
    primaryKeyRemove: Ref<string | number>;
    primaryKeyUpdate: Ref<string | number>;
    primaryKeyDetail: Ref<string | number>;
}
export interface IForm {
    refForm: Ref<any>;
    refFormList: Ref<any>;
    refFormAdd: Ref<any>;
    refFormUpdate: Ref<any>;
    refFormDetail: Ref<any>;
}
export interface IContainer {
    containerHeight: Ref<number>;
    containerTarget: Ref<string>;
    containerInitialize: () => void;
}
export interface ITable {
    selectionMultiple: Ref<any[]>;
    selectionChange: (selection: any) => void;
}
export interface IModel {
    modelResult: any;
    modelPagination: IPagination;
}
export interface IPagination {
    pageSize: number;
    pageNum: number;
    [key: string]: any;
}
export declare function useStatus(): IStatus;
export declare function usePrimaryKey(): IPrimaryKey;
export declare function useForm(): IForm;
export declare function useContainer(): IContainer;
/**
 * use table
 * @returns
 */
export declare function useTable(): ITable;
export declare function useModel(): IModel;
