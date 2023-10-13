import formItem from "./src/index.vue";

import { install } from '../../_utils'

export const YtoForm = install(formItem);

export type FormItemInstance = InstanceType<typeof formItem>;

export default YtoForm;
