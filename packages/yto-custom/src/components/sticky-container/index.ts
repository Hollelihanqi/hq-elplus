import StickyContainer from "./src/index";

import { install } from "../../_utils";

export const YtoStickyContainer = install(StickyContainer);
export default YtoStickyContainer;

export type StickyContainerInstance = InstanceType<typeof StickyContainer>;


