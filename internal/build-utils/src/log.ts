/*
 * @Author: DESKTOP-7338OS6\LHQ LHQ
 * @Date: 2024-07-10 16:52:36
 * @LastEditors: DESKTOP-7338OS6\LHQ LHQ
 * @LastEditTime: 2024-07-11 16:24:25
 * @FilePath: \yto-engine\internal\build-utils\src\log.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import process from 'process'
import { consola } from "consola";

export function errorAndExit(err: Error) {
  consola.error(err);
  process.exit(1);
}
