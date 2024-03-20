import form from './src/index.vue';

import { install } from '../../_utils';

export const YtoForm = install(form);

export type FormItemInstance = InstanceType<typeof form>;

export default YtoForm;
