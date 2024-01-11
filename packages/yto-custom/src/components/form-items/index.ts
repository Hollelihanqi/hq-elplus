import formItems from "./src/index.vue";

import { install } from '../../_utils'

export const YtoFormItems = install(formItems);

export type FormItemInstance = InstanceType<typeof formItems>;

export default YtoFormItems;
