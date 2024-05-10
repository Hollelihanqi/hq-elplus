// ../node_modules/.pnpm/vitepress@1.0.1_@algolia+client-search@4.22.1_@types+node@18.19.17_nprogress@0.2.0_postcss@8._djly2vwbkphtgslyg7xgpfsjby/node_modules/vitepress/lib/vue-demi.mjs
var isVue2 = false;
var isVue3 = true;
function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  target[key] = val;
  return val;
}
function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete target[key];
}

export { isVue2, isVue3, set, del };
/*! Bundled license information:

vitepress/lib/vue-demi.mjs:
  (**
   * vue-demi v0.14.7
   * Copyright (c) 2020-present, Anthony Fu
   * @license MIT
   *)
*/
//# sourceMappingURL=chunk-AQOOY4GY.js.map
