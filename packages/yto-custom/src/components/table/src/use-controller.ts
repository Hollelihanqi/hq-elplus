import type { TableProps, ColumnsItemProps, setColumnsProps } from "./interface";
const _columns = ref<any>([])

const useController = (props?: TableProps) => {
    _columns.value = props?.columns
    const SettingInstance = ref()
    const handleSetting = () => {
        SettingInstance.value.actionDialog()
    }
    const HandleSetSave = (value: setColumnsProps[]) => {
        console.log(value)
        const newColumns = _ideepClone(_columns.value)
        value.forEach((item) => {
            newColumns.forEach((column: ColumnsItemProps) => {
                if (item.prop === column.prop) {
                    column.show = item.checked
                }
            })
        })
        console.log(newColumns)
        _columns.value = newColumns
    }
    return {
        _columns,
        SettingInstance,
        handleSetting,
        HandleSetSave
    }
}

function _ideepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        let copy = obj.map((item) => _ideepClone(item));
        return copy as T;
    }

    if (obj instanceof Object) {
        let copy = Object.create(Object.getPrototypeOf(obj));
        Object.keys(obj).forEach((key) => {
            (copy as any)[key] = _ideepClone((obj as any)[key]);
        });
        return copy as T;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

// const _ideepClone = (obj: any) => {
//     if (obj === null || typeof obj !== 'object') {
//         return obj;
//     }

//     if (obj instanceof Array) {
//         let copy = [];
//         for (let i = 0, len = obj.length; i < len; i++) {
//             copy[i] = _ideepClone(obj[i]);
//         }
//         return copy;
//     }

//     if (obj instanceof Object) {
//         let copy: any = {};
//         for (let key in obj) {
//             if (obj.hasOwnProperty(key)) {
//                 copy[key] = _ideepClone(obj[key]);
//             }
//         }
//         return copy;
//     }

//     throw new Error("Unable to copy obj! Its type isn't supported.");
// }

export default useController