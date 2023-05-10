/*
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-05-10 13:12:55
 * @LastEditTime: 2023-05-10 13:16:10
 */
// index
import Menu from "./src/index.vue";

import { install } from "../../_utils";

export const YtoMenu = install(Menu);

export type { MenuInstance } from "./src/instance";

export default YtoMenu;
