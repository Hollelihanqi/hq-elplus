/*
 * @Description: 模块名称
 * @Author: ym
 * @Date: 2023-05-10 13:12:55
 * @LastEditTime: 2024-02-21 13:28:11
 */
// index
import Radio from "./src/index.vue";

import { install } from "../../_utils";

export const YtoRadio = install(Radio);
export default YtoRadio;

export * from './src/interface'
export type RadioInstance = InstanceType<typeof Radio>;



