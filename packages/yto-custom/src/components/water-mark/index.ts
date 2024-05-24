import Watermark from "./src/index.vue";

import { install } from "../../_utils";

export const YtoWatermark = install(Watermark);
export default YtoWatermark;

export * from "./src/interface";
export type WatermarkInstance = InstanceType<typeof Watermark>;
