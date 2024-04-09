import JsonViewer from "./src/index.vue";

import { install } from "../../_utils";

export const YtoJsonViewer = install(JsonViewer);
export default YtoJsonViewer;

export * from "./src/interface";
export type JsonViewerInstance = InstanceType<typeof JsonViewer>;
