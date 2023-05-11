import formItem from "./src/index.vue";

import { install } from '../../_utils'

export const YtoFormItem = install(formItem);
export type FormItemInstance = InstanceType<typeof formItem>;

export default YtoFormItem;
