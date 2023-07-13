import RemoteSearch from "./src/index.vue";

import { install } from "../../_utils";

export const YtoRemoteSearch = install(RemoteSearch);

export type { RemoteSearchInstance } from "./src/instance";

export default YtoRemoteSearch;
