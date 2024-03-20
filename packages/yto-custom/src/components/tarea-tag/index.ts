import TareaTag from './src/index.vue';

import { install } from '../../_utils';

export const YtoTareaTag = install(TareaTag);
export default YtoTareaTag;

export * from './src/interface';
export type TareaTagInstance = InstanceType<typeof TareaTag>;
