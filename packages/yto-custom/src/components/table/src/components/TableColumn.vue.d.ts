import { DefineComponent, Slot } from "vue";

export interface TableColumnProps {
  column: {
    type: ObjectConstructor;
    default: () => Record<string, any>;
  };
}

export interface TableColumnSlots {
  [key: string]: Slot | undefined;
}

export const TableColumn: DefineComponent<TableColumnProps, {}, TableColumnSlots>;
export default TableColumn;
