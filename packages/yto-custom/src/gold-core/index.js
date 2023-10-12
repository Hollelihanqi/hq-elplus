var lt = Object.defineProperty;
var ut = (e, r, t) => r in e ? lt(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var B = (e, r, t) => (ut(e, typeof r != "symbol" ? r + "" : r, t), t);
import { Axios as ft } from "axios";
import { createRouter as yt, createWebHistory as pt } from "vue-router";
import { ref as O, watch as qe, reactive as dt, provide as Oe, unref as z, onMounted as ht, nextTick as vt } from "vue";
var A = /* @__PURE__ */ ((e) => (e.Number = "[object Number]", e.Boolean = "[object Boolean]", e.Object = "[object Object]", e.Array = "[object Array]", e.Function = "[object Function]", e.String = "[object String]", e.RegExp = "[object RegExp]", e.Blob = "[object Blob]", e.File = "[object File]", e.Date = "[object Date]", e.Error = "[object Error]", e.Promise = "[object Promise]", e.Undefined = "[object Undefined]", e.Null = "[object Null]", e.AsyncFunction = "[object AsyncFunction]", e))(A || {}), Y = /* @__PURE__ */ ((e) => (e.debug = "debug", e.error = "error", e.info = "info", e.warn = "warn", e))(Y || {}), gt = /* @__PURE__ */ ((e) => (e[e.ms = 0] = "ms", e[e.hour = 1] = "hour", e[e.minute = 2] = "minute", e[e.second = 3] = "second", e))(gt || {}), mt = /* @__PURE__ */ ((e) => (e.white = "37m", e.red = "31m", e.green = "32m", e.yellow = "33m", e.blue = "34m", e))(mt || {}), ze = /* @__PURE__ */ ((e) => (e[e.vertical = 0] = "vertical", e[e.horizontal = 1] = "horizontal", e))(ze || {}), Ur = /* @__PURE__ */ ((e) => (e[e.ASC = 0] = "ASC", e[e.DESC = 1] = "DESC", e))(Ur || {}), Ve = /* @__PURE__ */ ((e) => (e[e.FlatMap = 0] = "FlatMap", e[e.URlParams = 1] = "URlParams", e))(Ve || {}), bt = /* @__PURE__ */ ((e) => (e[e.xml = 0] = "xml", e[e.ts = 1] = "ts", e[e.java = 2] = "java", e[e.json = 3] = "json", e[e.md = 4] = "md", e[e.vue = 5] = "vue", e[e.html = 6] = "html", e[e.css = 7] = "css", e[e.scss = 8] = "scss", e[e.properties = 9] = "properties", e[e.sql = 10] = "sql", e[e.sh = 11] = "sh", e[e.yaml = 12] = "yaml", e[e.conf = 13] = "conf", e[e.txt = 14] = "txt", e[e.js = 15] = "js", e))(bt || {});
function _(e) {
  return toString.call(e);
}
function St(e) {
  return _(e) === A.Date;
}
function wt(e) {
  return _(e) === A.File;
}
function At(e) {
  return _(e) === A.Blob;
}
function Ot(e) {
  return _(e) === A.Boolean;
}
function Rt(e) {
  return _(e) === A.Number;
}
function G(e) {
  return _(e) === A.String;
}
function Pt(e) {
  return b(e) || nr(e);
}
function b(e) {
  return typeof e != "object" || e instanceof Array ? !1 : Object.isExtensible(e);
}
function nr(e) {
  return e instanceof Array;
}
function _t(e) {
  return _(e) === A.Array;
}
function Et(e) {
  return _(e) === A.Function;
}
function $t(e) {
  return _(e) === A.AsyncFunction;
}
function xt(e) {
  return _(e) === A.Promise;
}
function It(e) {
  return _(e) === A.Error;
}
const Yo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getType: _,
  isArray: nr,
  isAsyncFunction: $t,
  isBlog: At,
  isBoolean: Ot,
  isDate: St,
  isError: It,
  isFile: wt,
  isFunction: Et,
  isNumber: Rt,
  isObject: b,
  isObjectOrArray: Pt,
  isPromise: xt,
  isRegExp: _t,
  isString: G
}, Symbol.toStringTag, { value: "Module" }));
class F extends Error {
  /**
   * 控制台异常构造
   * @param message 异常信息
   * @param type 控制台类型
   */
  constructor(t, n) {
    super(t);
    B(this, "__type");
    this.__type = n;
  }
  /**
   * 获取控制台类型
   */
  get type() {
    return this.__type || Y.debug;
  }
}
class Zo extends Error {
  constructor(r) {
    super(r);
  }
}
function ea(e) {
  return S(e) ? !1 : b(e) && Object.keys(e).length > 0;
}
function ra(e) {
  return S(e) ? !1 : e instanceof Array && e.length > 0;
}
function S(e) {
  return e == null;
}
function Nt(e) {
  return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
function I(e) {
  if (S(e))
    return !0;
  if (G(e)) {
    const r = Nt(e);
    return r === "" || r === "null" || r === "undefined";
  }
  return e instanceof Array ? e.length === 0 : b(e) ? Object.keys(e).length === 0 : !1;
}
function Ft(e, r) {
  if (S(e))
    throw new Error(r);
}
function Mt(e, r) {
  if (!G(e))
    throw new Error(r);
}
function jt(e, r) {
  if (I(e))
    throw new Error(r);
}
function Ct(e, r) {
  if (!nr(e))
    throw new Error(r);
}
function kt(e, r) {
  if (I(e))
    throw new Error(r);
}
function xe(e, r) {
  if (b(e) === !1)
    throw new Error(r);
}
function Lt(e, r) {
  if (I(e))
    throw new Error(r);
}
const ta = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isArray: Ct,
  isObject: xe,
  isString: Mt,
  notBlank: jt,
  notEmpty: Ft,
  validArray: kt,
  validObject: Lt
}, Symbol.toStringTag, { value: "Module" }));
function Ut(e) {
  const r = e.replace(/[^\d]+/, "");
  return S(r) ? 0 : Number(r);
}
function Br(e, r = "-") {
  return e.includes("/") ? e.split("/").flatMap((t) => Br(t, r)).join("/") : Wr(or(e, r));
}
function or(e, r = "-") {
  return e.includes("/") ? e.split("/").flatMap((t) => or(t, r)).join("/") : e.split(r).flatMap((t) => Dr(t)).join("");
}
function Tr(e, r = "-") {
  const t = e.replace(/([A-Z])/g, (n) => r + n.toLowerCase()).replace(/\/-/g, "/");
  return t.startsWith(r) ? t.substring(1) : t;
}
function He(e) {
  return e.replace(/:\/+/g, "**").replace(/\\+/g, "/").replace(/\/+|\\+/g, "/").replace("**", "://");
}
function me(e, r) {
  return e.startsWith("http://") || e.startsWith("https://") ? new URL(He(e)) : new URL(He(`${r || location.origin}/${e}`));
}
function Dr(e) {
  return S(e) ? "" : e.slice(0, 1).toUpperCase() + e.slice(1);
}
function Wr(e) {
  return S(e) ? "" : e.slice(0, 1).toLowerCase() + e.slice(1);
}
const na = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  toFirstCharLowerCase: Wr,
  toFirstCharUpperCase: Dr,
  toJoin: Tr,
  toLowerCamelCase: Br,
  toNumber: Ut,
  toPathFormat: He,
  toURL: me,
  toUpperCamelCase: or
}, Symbol.toStringTag, { value: "Module" })), m = new Proxy(console, {
  get(e, r) {
    var n;
    const t = e[r];
    if (t instanceof Function && r === Y.debug) {
      const a = (n = globalThis.window) == null ? void 0 : n.sessionStorage;
      return S(a.getItem("gold-debugger")) === !1 ? t : () => {
      };
    }
    return t;
  }
});
function oa(e, r, t) {
  return I(e) || e.sort((n, a) => {
    let o = r(n), i = r(a);
    return G(o) === !1 && (o = JSON.stringify(o)), G(i) === !1 && (i = JSON.stringify(i)), o === i ? 0 : t === Ur.DESC ? i > o ? 1 : -1 : o > i ? 1 : -1;
  }), e;
}
function qr(e) {
  return window.btoa(encodeURIComponent(e));
}
function aa(e) {
  return encodeURIComponent(window.atob(e));
}
function ia(e, r) {
  if (xe(e, "target is not Object"), r.includes(".") === !1)
    return Reflect.get(e, r);
  const t = r.split(".");
  let n = { ...e };
  for (const a of t) {
    if (S(a) || b(n) === !1 || Reflect.has(n, a) === !1)
      return "";
    n = Reflect.get(n, a);
  }
  return n;
}
function ca(e) {
  if (e instanceof Array && e.splice(0, e.length), b(e))
    for (const r of Object.keys(e))
      Reflect.deleteProperty(e, r);
  return e;
}
function sa() {
  const e = [], r = "0123456789abcdef";
  for (let t = 0; t < 36; t++)
    e.push(r.substring(Math.floor(Math.random() * 16), 1));
  return e[14] = "4", e[19] = r.substring(e[19] & 3 | 8, 1), e[8] = e[13] = e[18] = e[23] = "-", e.join("");
}
function la(e, r) {
  return r instanceof Function ? S(e.find((t) => r(t))) === !1 : e.includes(r);
}
function ua(e, r) {
  return S(r) && (r = ze.vertical), r === ze.vertical ? e.scrollHeight > e.clientHeight : e.scrollWidth > e.clientWidth;
}
function fa() {
  const e = document.createElement("div");
  Object.assign(e.style, { width: "100px", height: "100px", overflowY: "scroll" }), document.body.appendChild(e);
  const r = e.offsetWidth - e.clientWidth;
  return document.body.removeChild(e), r;
}
function ya(e, r) {
  if (r === Ve.FlatMap) {
    if (b(e))
      return ar(e);
    if (e instanceof Array)
      return ir(e);
  }
  if (r === Ve.URlParams)
    return new URLSearchParams(e).toString();
}
function ar(e, r) {
  xe(e, "参数：target 必须是对象");
  for (const t in e) {
    const n = Reflect.get(e, t);
    if (b(n)) {
      const a = r ? `${r}.${t}` : t;
      Object.assign(e, ar(n, a)), Reflect.deleteProperty(e, t);
      continue;
    }
    if (r && (Reflect.set(e, `${r}.${t}`, n), Reflect.deleteProperty(e, t)), n instanceof Array) {
      const a = r ? `${r}.${t}` : t;
      Object.assign(e, ir(n, a)), Reflect.deleteProperty(e, t);
      continue;
    }
  }
  return e;
}
function ir(e, r) {
  const t = {};
  return e.forEach((n, a) => {
    m.debug(a);
    const o = r ? `${r}[${a}]` : `[${a}]`;
    if (b(n)) {
      Object.assign(t, ar(n, o));
      return;
    }
    if (n instanceof Array) {
      Object.assign(t, ir(n, o));
      return;
    }
    Reflect.set(t, o, n);
  }), t;
}
function pa(e) {
  const r = new URLSearchParams(e), t = {};
  return r.forEach((n, a) => {
    Reflect.set(t, a, n);
  }), t;
}
function da(e, r = location.search) {
  return new URLSearchParams(r).get(e);
}
function ha() {
  return document.body.clientHeight;
}
function Bt(e, r, t) {
  if (b(e) === !1 || b(r) === !1)
    throw new F("target and source 必须都为 Object");
  if (G(t == null ? void 0 : t.uniqueKey)) {
    const n = Reflect.get(e, t == null ? void 0 : t.uniqueKey), a = Reflect.get(r, t == null ? void 0 : t.uniqueKey);
    return (t == null ? void 0 : t.useContent) === !0 ? JSON.stringify(n) === JSON.stringify(a) : n === a;
  }
  throw new F("参数：option.uniqueKey can't be blank String。");
}
function Re(e, r, t) {
  const n = [A.Undefined, A.Null];
  if (b(r) === !1)
    throw new F("source 必须都为 Object");
  if (b(e) === !1) {
    if (t.strict === !0)
      throw new F("严格模式：target 必须都为 Object");
    m.warn("target is not object；赋值：target = {}"), e = {};
  }
  function a(o, i) {
    const c = `${o}.`;
    return i.filter((s) => s.startsWith(c)).flatMap((s) => s.replace(c, ""));
  }
  for (const o in r) {
    if (t != null && t.ignoreKey && t.ignoreKey.includes(o))
      continue;
    const i = Reflect.get(e, o), c = Reflect.get(r, o), s = _(i), l = _(c);
    if ((t == null ? void 0 : t.ignoreEmpty) === !0 && n.includes(l)) {
      m.warn(`忽略空模式：source.${o} type is ${l}；合并忽略`);
      continue;
    }
    if ((t == null ? void 0 : t.strict) === !0 && Reflect.has(e, o) === !1) {
      m.warn(`严格模式：target not have 属性：${o}；合并忽略`);
      continue;
    }
    if (l === A.Object) {
      const u = a(o, (t == null ? void 0 : t.ignoreKey) || []);
      if (s !== A.Object && Reflect.set(e, o, {}), t != null && t.deep) {
        const y = Re(Reflect.get(e, o), c, { ...t, ignoreKey: u });
        Reflect.set(e, o, y);
        continue;
      }
      if (t != null && t.level && (t == null ? void 0 : t.level) > 1) {
        const y = Re(Reflect.get(e, o), c, { ...t, ignoreKey: u, level: (t == null ? void 0 : t.level) - 1 });
        Reflect.set(e, o, y);
        continue;
      }
    }
    if (l === A.Array) {
      const u = b(t == null ? void 0 : t.uniqueKey) ? Reflect.get(t == null ? void 0 : t.uniqueKey, o) : void 0;
      if (I(u))
        continue;
      if (s !== A.Array && Reflect.set(e, o, []), t != null && t.deep) {
        const y = Ge(Reflect.get(e, o), c, { ...t, uniqueKey: u });
        Reflect.set(e, o, y);
        continue;
      }
      if (t != null && t.level && (t == null ? void 0 : t.level) > 1) {
        const y = Ge(Reflect.get(e, o), c, { ...t, uniqueKey: u, level: (t == null ? void 0 : t.level) - 1 });
        Reflect.set(e, o, y);
        continue;
      }
    }
    Reflect.set(e, o, c);
  }
  return e;
}
function Ge(e, r, t) {
  if (I(t == null ? void 0 : t.uniqueKey))
    throw new F("参数：option.uniqueKey can't be blank。");
  for (const n of r) {
    if (b(n)) {
      const a = e.find((o) => Bt(o, n, t));
      if ((t == null ? void 0 : t.strict) === !0 && I(a))
        continue;
      if (b(a)) {
        Re(a, n, t);
        continue;
      }
    }
    e.push(n);
  }
  return e;
}
function Je(e, r, t) {
  if (e instanceof Array && r instanceof Array)
    return Ge(e, r, t);
  if (b(e) && b(r))
    return Re(e, r, t);
  throw new F(`target type is ${_(e)}, source type is ${_(r)}；type 必须为 array or object.`);
}
function va(e, r) {
  if (xe(e, "参数：target 必须为对象"), r === void 0 && (r = { deep: !1 }), r.deep === !0)
    try {
      return JSON.parse(JSON.stringify(e));
    } catch {
      m.error("Tools.clone --> deep = true，target = ", e);
    }
  const t = { ...e };
  if (r.exclude !== void 0)
    for (const n of r.exclude)
      Reflect.deleteProperty(t, n);
  return t;
}
function Tt(e) {
  if (S(e) === !1) {
    const r = e.$el || e;
    if (r instanceof HTMLElement)
      return r.getBoundingClientRect();
  }
  return new DOMRect();
}
function ga(e) {
  const r = new RegExp("(^| )" + e + "=([^;]*)(;|$)"), t = document.cookie.match(r);
  return t === null || t.length < 3 ? "" : unescape(t[2]);
}
function ma(e) {
  var r;
  if (S(e))
    return "";
  if (e instanceof Error)
    return e.message;
  if (b(e)) {
    if (Reflect.has(e, "body"))
      return (r = e.body) == null ? void 0 : r.message;
    if (Reflect.has(e, "message"))
      return e.message;
  }
  return e;
}
function ba(e) {
  var r;
  if (S(e))
    return "";
  if (e instanceof Error)
    return e.message;
  if (b(e)) {
    if (Reflect.has(e, "body"))
      return (r = e.body) == null ? void 0 : r.message;
    if (Reflect.has(e, "message"))
      return e.message;
  }
  return e;
}
function Sa(e, r) {
  const t = me(e);
  (r || location).href = t.href;
}
const Ke = "encrypt__";
function Ne(e, r, t) {
  m.debug(`storage.get：key = ${r}`);
  const n = e.getItem(r);
  if (S(n))
    return t == null ? void 0 : t.defaultValue;
  try {
    return n != null && n.startsWith(Ke) ? JSON.parse(qr(n.replace(Ke, ""))) : JSON.parse(n);
  } catch (a) {
    m.warn(`JSON.parse ${n} 异常：${a}.`, a);
    return;
  }
}
function vr(e, r, t, n) {
  if (m.debug(`storage.set：key = ${r}`), I(t))
    return;
  const a = JSON.stringify(t), o = (n == null ? void 0 : n.encrypt) === !0 ? Ke + qr(a) : a;
  e.setItem(r, o);
}
function Dt(e) {
  e.clear();
}
function Wt(e, r) {
  m.debug(`storage.remove：key = ${r}`), e.removeItem(r);
}
class zr {
  constructor(r) {
    B(this, "__storage");
    var t;
    this.__storage = S(r) ? (t = globalThis.window) == null ? void 0 : t.localStorage : r;
  }
  /**
   * storage 通过 Key 存储
   * @param key storage key
   * @param option { defaultValue：'默认值' }
   * @returns 返回目标
   */
  get(r, t) {
    return Ne(this.__storage, r, t);
  }
  /**
   * storage set value
   * @param key storage key
   * @param value storage value
   * @param option IOptionStorage 参数
   * @returns 
   */
  set(r, t, n) {
    vr(this.__storage, r, t, n);
  }
  clear() {
    Dt(this.__storage);
  }
  remove(r) {
    Wt(this.__storage, r);
  }
  /**
   * 向 keyRoot 对象追加 { [key]: value}
   * @param key storage key
   * @param attribute 属性名
   * @param value 属性值
   * @param option IOptionStorage 参数
   * @returns 
   */
  put(r, t, n, a) {
    const o = Ne(this.__storage, r, Object.assign({}, a, { defaultValue: {} }));
    if (b(o)) {
      Reflect.set(o, t, n), vr(this.__storage, r, o, a);
      return;
    }
    m.warn(`${r} value is not Object`);
  }
  /**
   * 获取 Map 元素
   * @param key storage key
   * @param attribute map key
   * @returns map value
   */
  getAttribute(r, t, n) {
    const a = Ne(this.__storage, r, Object.assign({}, n, { defaultValue: {} }));
    if (b(a)) {
      const o = Reflect.get(a, t);
      return S(o) ? n == null ? void 0 : n.defaultValue : o;
    }
    return null;
  }
}
var kr;
const wa = new zr((kr = globalThis.window) == null ? void 0 : kr.localStorage);
var Lr;
const L = new zr((Lr = globalThis.window) == null ? void 0 : Lr.sessionStorage);
class Aa {
  constructor(r, t = 12, n) {
    B(this, "__data", []);
    B(this, "__max");
    B(this, "__dataSource", []);
    B(this, "__pointList", []);
    B(this, "__denominator");
    B(this, "__height");
    this.__dataSource = r, this.__max = t + 1, this.__denominator = t, this.__pointList = [{ row: 1, column: 1 }], this.__height = n;
  }
  get pointList() {
    return this.__pointList;
  }
  set pointList(r) {
    this.__pointList = r;
  }
  get data() {
    return this.__data;
  }
  get areaHeight() {
    return Math.round(this.__height / this.__denominator);
  }
  get containerStyle() {
    return {
      display: "grid",
      "grid-template-columns": `repeat(${this.__denominator}, 1fr)`,
      "grid-auto-rows": `${this.areaHeight}px`
    };
  }
  itemStyle({ row: r, column: t }) {
    return r && t ? {
      "grid-row": `${r.start} / ${r.end}`,
      "grid-column": `${t.start} / ${t.end}`
    } : {};
  }
  include({ start: r, end: t }, n) {
    return n += 0.1, n >= r && n <= t;
  }
  includePoint({ row: r, column: t }) {
    for (const n of this.data)
      if (this.include(n.row, r) && this.include(n.column, t))
        return !0;
    return !1;
  }
  mergeArea() {
    for (const r of this.pointList)
      this.includePoint(r) && Object.assign(r, { disabled: !0 });
  }
  orderArea() {
    this.pointList.sort((r, t) => r.row === t.row ? r.column - t.column : r.row - t.row);
  }
  parseAllArea() {
    for (let r of this.__dataSource) {
      const t = this.parseArea(r);
      t.row && t.column && (this.__data.push(t), this.parsePoint(), r.row = t.row, r.column = t.column);
    }
  }
  removeMarkArea() {
    const r = this.pointList.length;
    for (let t = r - 1; t >= 0; t--)
      this.pointList[t].disabled === !0 && this.pointList.splice(t, 1);
  }
  crossVerify(r, { start: t, end: n }) {
    return !(t + 1e-3 > r.end || n - 1e-3 < r.start);
  }
  crossArea({ row: r, column: t }) {
    for (const n of this.data)
      if (this.crossVerify(n.row, r) && this.crossVerify(n.column, t))
        return !0;
    return !1;
  }
  /**
   * 点位向上移动， 每次减 1
   * @param {Object} param
   */
  extendPointUpAndPush({ row: r, column: t }) {
    let n = { row: r, column: t }, a = 0;
    do {
      if (a++, a > 100)
        break;
      if (n = { row: n.row - 1, column: t }, n.row === 0 || this.includePoint(n)) {
        this.pointList.push({ row: n.row + 1, column: t });
        return;
      }
    } while (!0);
  }
  /**
   * 点位向左移动， 每次减 1
   * @param {Object} param
   */
  extendPointLeftAndPush({ row: r, column: t }) {
    let n = { row: r, column: t }, a = 0;
    do {
      if (a++, a > 100)
        break;
      if (n = { row: r, column: n.column - 1 }, n.column === 0 || this.includePoint(n)) {
        this.pointList.push({ row: r, column: n.column + 1 });
        return;
      }
    } while (!0);
  }
  /**
   * 点位解析
   */
  parsePoint() {
    this.pointList = [];
    for (const r of this.data)
      r.column.end < this.__max && this.extendPointUpAndPush({
        column: r.column.end,
        row: r.row.start
      }), this.extendPointLeftAndPush({
        column: r.column.start,
        row: r.row.end
      });
    this.orderArea(
      /** 区域排序 */
    ), this.mergeArea(
      /** 区域合并 */
    ), this.removeMarkArea(
      /** 区域移出 */
    );
  }
  parseArea(r) {
    const { rowspan: t, colspan: n, ...a } = r;
    if (t > this.__max - 1 || n > this.__max - 1)
      throw new Error("数据异常，请检查。");
    const o = { ...a };
    let i = !1;
    for (const c of this.pointList) {
      const { row: s, column: l } = c;
      if (c.disabled === !0)
        continue;
      if (i === !0)
        break;
      if (l + n > this.__max)
        continue;
      const u = {
        row: { start: s, end: s + t },
        column: { start: l, end: l + n }
      };
      this.crossArea(u) || (Object.assign(o, u), c.disabled = i = !0);
    }
    return o;
  }
}
function qt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function zt(e) {
  if (e.__esModule)
    return e;
  var r = e.default;
  if (typeof r == "function") {
    var t = function n() {
      if (this instanceof n) {
        var a = [null];
        a.push.apply(a, arguments);
        var o = Function.bind.apply(r, a);
        return new o();
      }
      return r.apply(this, arguments);
    };
    t.prototype = r.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var a = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(t, n, a.get ? a : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), t;
}
var Vt = function() {
  if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
    return !1;
  if (typeof Symbol.iterator == "symbol")
    return !0;
  var r = {}, t = Symbol("test"), n = Object(t);
  if (typeof t == "string" || Object.prototype.toString.call(t) !== "[object Symbol]" || Object.prototype.toString.call(n) !== "[object Symbol]")
    return !1;
  var a = 42;
  r[t] = a;
  for (t in r)
    return !1;
  if (typeof Object.keys == "function" && Object.keys(r).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(r).length !== 0)
    return !1;
  var o = Object.getOwnPropertySymbols(r);
  if (o.length !== 1 || o[0] !== t || !Object.prototype.propertyIsEnumerable.call(r, t))
    return !1;
  if (typeof Object.getOwnPropertyDescriptor == "function") {
    var i = Object.getOwnPropertyDescriptor(r, t);
    if (i.value !== a || i.enumerable !== !0)
      return !1;
  }
  return !0;
}, gr = typeof Symbol < "u" && Symbol, Ht = Vt, Gt = function() {
  return typeof gr != "function" || typeof Symbol != "function" || typeof gr("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : Ht();
}, Jt = "Function.prototype.bind called on incompatible ", Fe = Array.prototype.slice, Kt = Object.prototype.toString, Qt = "[object Function]", Xt = function(r) {
  var t = this;
  if (typeof t != "function" || Kt.call(t) !== Qt)
    throw new TypeError(Jt + t);
  for (var n = Fe.call(arguments, 1), a, o = function() {
    if (this instanceof a) {
      var u = t.apply(
        this,
        n.concat(Fe.call(arguments))
      );
      return Object(u) === u ? u : this;
    } else
      return t.apply(
        r,
        n.concat(Fe.call(arguments))
      );
  }, i = Math.max(0, t.length - n.length), c = [], s = 0; s < i; s++)
    c.push("$" + s);
  if (a = Function("binder", "return function (" + c.join(",") + "){ return binder.apply(this,arguments); }")(o), t.prototype) {
    var l = function() {
    };
    l.prototype = t.prototype, a.prototype = new l(), l.prototype = null;
  }
  return a;
}, Yt = Xt, cr = Function.prototype.bind || Yt, Zt = cr, en = Zt.call(Function.call, Object.prototype.hasOwnProperty), d, ie = SyntaxError, Vr = Function, ae = TypeError, Me = function(e) {
  try {
    return Vr('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, Z = Object.getOwnPropertyDescriptor;
if (Z)
  try {
    Z({}, "");
  } catch {
    Z = null;
  }
var je = function() {
  throw new ae();
}, rn = Z ? function() {
  try {
    return arguments.callee, je;
  } catch {
    try {
      return Z(arguments, "callee").get;
    } catch {
      return je;
    }
  }
}() : je, ne = Gt(), C = Object.getPrototypeOf || function(e) {
  return e.__proto__;
}, oe = {}, tn = typeof Uint8Array > "u" ? d : C(Uint8Array), ee = {
  "%AggregateError%": typeof AggregateError > "u" ? d : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? d : ArrayBuffer,
  "%ArrayIteratorPrototype%": ne ? C([][Symbol.iterator]()) : d,
  "%AsyncFromSyncIteratorPrototype%": d,
  "%AsyncFunction%": oe,
  "%AsyncGenerator%": oe,
  "%AsyncGeneratorFunction%": oe,
  "%AsyncIteratorPrototype%": oe,
  "%Atomics%": typeof Atomics > "u" ? d : Atomics,
  "%BigInt%": typeof BigInt > "u" ? d : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? d : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? d : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? d : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array > "u" ? d : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? d : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? d : FinalizationRegistry,
  "%Function%": Vr,
  "%GeneratorFunction%": oe,
  "%Int8Array%": typeof Int8Array > "u" ? d : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? d : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? d : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": ne ? C(C([][Symbol.iterator]())) : d,
  "%JSON%": typeof JSON == "object" ? JSON : d,
  "%Map%": typeof Map > "u" ? d : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !ne ? d : C((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? d : Promise,
  "%Proxy%": typeof Proxy > "u" ? d : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect > "u" ? d : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? d : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !ne ? d : C((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? d : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": ne ? C(""[Symbol.iterator]()) : d,
  "%Symbol%": ne ? Symbol : d,
  "%SyntaxError%": ie,
  "%ThrowTypeError%": rn,
  "%TypedArray%": tn,
  "%TypeError%": ae,
  "%Uint8Array%": typeof Uint8Array > "u" ? d : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? d : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? d : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? d : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap > "u" ? d : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? d : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? d : WeakSet
};
try {
  null.error;
} catch (e) {
  var nn = C(C(e));
  ee["%Error.prototype%"] = nn;
}
var on = function e(r) {
  var t;
  if (r === "%AsyncFunction%")
    t = Me("async function () {}");
  else if (r === "%GeneratorFunction%")
    t = Me("function* () {}");
  else if (r === "%AsyncGeneratorFunction%")
    t = Me("async function* () {}");
  else if (r === "%AsyncGenerator%") {
    var n = e("%AsyncGeneratorFunction%");
    n && (t = n.prototype);
  } else if (r === "%AsyncIteratorPrototype%") {
    var a = e("%AsyncGenerator%");
    a && (t = C(a.prototype));
  }
  return ee[r] = t, t;
}, mr = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, be = cr, Pe = en, an = be.call(Function.call, Array.prototype.concat), cn = be.call(Function.apply, Array.prototype.splice), br = be.call(Function.call, String.prototype.replace), _e = be.call(Function.call, String.prototype.slice), sn = be.call(Function.call, RegExp.prototype.exec), ln = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, un = /\\(\\)?/g, fn = function(r) {
  var t = _e(r, 0, 1), n = _e(r, -1);
  if (t === "%" && n !== "%")
    throw new ie("invalid intrinsic syntax, expected closing `%`");
  if (n === "%" && t !== "%")
    throw new ie("invalid intrinsic syntax, expected opening `%`");
  var a = [];
  return br(r, ln, function(o, i, c, s) {
    a[a.length] = c ? br(s, un, "$1") : i || o;
  }), a;
}, yn = function(r, t) {
  var n = r, a;
  if (Pe(mr, n) && (a = mr[n], n = "%" + a[0] + "%"), Pe(ee, n)) {
    var o = ee[n];
    if (o === oe && (o = on(n)), typeof o > "u" && !t)
      throw new ae("intrinsic " + r + " exists, but is not available. Please file an issue!");
    return {
      alias: a,
      name: n,
      value: o
    };
  }
  throw new ie("intrinsic " + r + " does not exist!");
}, sr = function(r, t) {
  if (typeof r != "string" || r.length === 0)
    throw new ae("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof t != "boolean")
    throw new ae('"allowMissing" argument must be a boolean');
  if (sn(/^%?[^%]*%?$/, r) === null)
    throw new ie("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var n = fn(r), a = n.length > 0 ? n[0] : "", o = yn("%" + a + "%", t), i = o.name, c = o.value, s = !1, l = o.alias;
  l && (a = l[0], cn(n, an([0, 1], l)));
  for (var u = 1, y = !0; u < n.length; u += 1) {
    var f = n[u], v = _e(f, 0, 1), h = _e(f, -1);
    if ((v === '"' || v === "'" || v === "`" || h === '"' || h === "'" || h === "`") && v !== h)
      throw new ie("property names with quotes must have matching quotes");
    if ((f === "constructor" || !y) && (s = !0), a += "." + f, i = "%" + a + "%", Pe(ee, i))
      c = ee[i];
    else if (c != null) {
      if (!(f in c)) {
        if (!t)
          throw new ae("base intrinsic for " + r + " exists, but the property is not available.");
        return;
      }
      if (Z && u + 1 >= n.length) {
        var g = Z(c, f);
        y = !!g, y && "get" in g && !("originalValue" in g.get) ? c = g.get : c = c[f];
      } else
        y = Pe(c, f), c = c[f];
      y && !s && (ee[i] = c);
    }
  }
  return c;
}, Hr = { exports: {} };
(function(e) {
  var r = cr, t = sr, n = t("%Function.prototype.apply%"), a = t("%Function.prototype.call%"), o = t("%Reflect.apply%", !0) || r.call(a, n), i = t("%Object.getOwnPropertyDescriptor%", !0), c = t("%Object.defineProperty%", !0), s = t("%Math.max%");
  if (c)
    try {
      c({}, "a", { value: 1 });
    } catch {
      c = null;
    }
  e.exports = function(y) {
    var f = o(r, a, arguments);
    if (i && c) {
      var v = i(f, "length");
      v.configurable && c(
        f,
        "length",
        { value: 1 + s(0, y.length - (arguments.length - 1)) }
      );
    }
    return f;
  };
  var l = function() {
    return o(r, n, arguments);
  };
  c ? c(e.exports, "apply", { value: l }) : e.exports.apply = l;
})(Hr);
var pn = Hr.exports, Gr = sr, Jr = pn, dn = Jr(Gr("String.prototype.indexOf")), hn = function(r, t) {
  var n = Gr(r, !!t);
  return typeof n == "function" && dn(r, ".prototype.") > -1 ? Jr(n) : n;
};
const vn = {}, gn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vn
}, Symbol.toStringTag, { value: "Module" })), mn = /* @__PURE__ */ zt(gn);
var lr = typeof Map == "function" && Map.prototype, Ce = Object.getOwnPropertyDescriptor && lr ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, Ee = lr && Ce && typeof Ce.get == "function" ? Ce.get : null, Sr = lr && Map.prototype.forEach, ur = typeof Set == "function" && Set.prototype, ke = Object.getOwnPropertyDescriptor && ur ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, $e = ur && ke && typeof ke.get == "function" ? ke.get : null, wr = ur && Set.prototype.forEach, bn = typeof WeakMap == "function" && WeakMap.prototype, he = bn ? WeakMap.prototype.has : null, Sn = typeof WeakSet == "function" && WeakSet.prototype, ve = Sn ? WeakSet.prototype.has : null, wn = typeof WeakRef == "function" && WeakRef.prototype, Ar = wn ? WeakRef.prototype.deref : null, An = Boolean.prototype.valueOf, On = Object.prototype.toString, Rn = Function.prototype.toString, Pn = String.prototype.match, fr = String.prototype.slice, H = String.prototype.replace, _n = String.prototype.toUpperCase, Or = String.prototype.toLowerCase, Kr = RegExp.prototype.test, Rr = Array.prototype.concat, k = Array.prototype.join, En = Array.prototype.slice, Pr = Math.floor, Qe = typeof BigInt == "function" ? BigInt.prototype.valueOf : null, Le = Object.getOwnPropertySymbols, Xe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Symbol.prototype.toString : null, ce = typeof Symbol == "function" && typeof Symbol.iterator == "object", E = typeof Symbol == "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === ce || "symbol") ? Symbol.toStringTag : null, Qr = Object.prototype.propertyIsEnumerable, _r = (typeof Reflect == "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
  return e.__proto__;
} : null);
function Er(e, r) {
  if (e === 1 / 0 || e === -1 / 0 || e !== e || e && e > -1e3 && e < 1e3 || Kr.call(/e/, r))
    return r;
  var t = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof e == "number") {
    var n = e < 0 ? -Pr(-e) : Pr(e);
    if (n !== e) {
      var a = String(n), o = fr.call(r, a.length + 1);
      return H.call(a, t, "$&_") + "." + H.call(H.call(o, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return H.call(r, t, "$&_");
}
var Ye = mn, $r = Ye.custom, xr = Yr($r) ? $r : null, $n = function e(r, t, n, a) {
  var o = t || {};
  if (V(o, "quoteStyle") && o.quoteStyle !== "single" && o.quoteStyle !== "double")
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  if (V(o, "maxStringLength") && (typeof o.maxStringLength == "number" ? o.maxStringLength < 0 && o.maxStringLength !== 1 / 0 : o.maxStringLength !== null))
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  var i = V(o, "customInspect") ? o.customInspect : !0;
  if (typeof i != "boolean" && i !== "symbol")
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  if (V(o, "indent") && o.indent !== null && o.indent !== "	" && !(parseInt(o.indent, 10) === o.indent && o.indent > 0))
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  if (V(o, "numericSeparator") && typeof o.numericSeparator != "boolean")
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  var c = o.numericSeparator;
  if (typeof r > "u")
    return "undefined";
  if (r === null)
    return "null";
  if (typeof r == "boolean")
    return r ? "true" : "false";
  if (typeof r == "string")
    return et(r, o);
  if (typeof r == "number") {
    if (r === 0)
      return 1 / 0 / r > 0 ? "0" : "-0";
    var s = String(r);
    return c ? Er(r, s) : s;
  }
  if (typeof r == "bigint") {
    var l = String(r) + "n";
    return c ? Er(r, l) : l;
  }
  var u = typeof o.depth > "u" ? 5 : o.depth;
  if (typeof n > "u" && (n = 0), n >= u && u > 0 && typeof r == "object")
    return Ze(r) ? "[Array]" : "[Object]";
  var y = Hn(o, n);
  if (typeof a > "u")
    a = [];
  else if (Zr(a, r) >= 0)
    return "[Circular]";
  function f(M, q, U) {
    if (q && (a = En.call(a), a.push(q)), U) {
      var pe = {
        depth: o.depth
      };
      return V(o, "quoteStyle") && (pe.quoteStyle = o.quoteStyle), e(M, pe, n + 1, a);
    }
    return e(M, o, n + 1, a);
  }
  if (typeof r == "function" && !Ir(r)) {
    var v = Ln(r), h = Se(r, f);
    return "[Function" + (v ? ": " + v : " (anonymous)") + "]" + (h.length > 0 ? " { " + k.call(h, ", ") + " }" : "");
  }
  if (Yr(r)) {
    var g = ce ? H.call(String(r), /^(Symbol\(.*\))_[^)]*$/, "$1") : Xe.call(r);
    return typeof r == "object" && !ce ? de(g) : g;
  }
  if (qn(r)) {
    for (var $ = "<" + Or.call(String(r.nodeName)), p = r.attributes || [], x = 0; x < p.length; x++)
      $ += " " + p[x].name + "=" + Xr(xn(p[x].value), "double", o);
    return $ += ">", r.childNodes && r.childNodes.length && ($ += "..."), $ += "</" + Or.call(String(r.nodeName)) + ">", $;
  }
  if (Ze(r)) {
    if (r.length === 0)
      return "[]";
    var P = Se(r, f);
    return y && !Vn(P) ? "[" + er(P, y) + "]" : "[ " + k.call(P, ", ") + " ]";
  }
  if (Nn(r)) {
    var N = Se(r, f);
    return !("cause" in Error.prototype) && "cause" in r && !Qr.call(r, "cause") ? "{ [" + String(r) + "] " + k.call(Rr.call("[cause]: " + f(r.cause), N), ", ") + " }" : N.length === 0 ? "[" + String(r) + "]" : "{ [" + String(r) + "] " + k.call(N, ", ") + " }";
  }
  if (typeof r == "object" && i) {
    if (xr && typeof r[xr] == "function" && Ye)
      return Ye(r, { depth: u - n });
    if (i !== "symbol" && typeof r.inspect == "function")
      return r.inspect();
  }
  if (Un(r)) {
    var ue = [];
    return Sr && Sr.call(r, function(M, q) {
      ue.push(f(q, r, !0) + " => " + f(M, r));
    }), Nr("Map", Ee.call(r), ue, y);
  }
  if (Dn(r)) {
    var fe = [];
    return wr && wr.call(r, function(M) {
      fe.push(f(M, r));
    }), Nr("Set", $e.call(r), fe, y);
  }
  if (Bn(r))
    return Ue("WeakMap");
  if (Wn(r))
    return Ue("WeakSet");
  if (Tn(r))
    return Ue("WeakRef");
  if (Mn(r))
    return de(f(Number(r)));
  if (Cn(r))
    return de(f(Qe.call(r)));
  if (jn(r))
    return de(An.call(r));
  if (Fn(r))
    return de(f(String(r)));
  if (!In(r) && !Ir(r)) {
    var K = Se(r, f), ye = _r ? _r(r) === Object.prototype : r instanceof Object || r.constructor === Object, W = r instanceof Object ? "" : "null prototype", re = !ye && E && Object(r) === r && E in r ? fr.call(J(r), 8, -1) : W ? "Object" : "", Q = ye || typeof r.constructor != "function" ? "" : r.constructor.name ? r.constructor.name + " " : "", te = Q + (re || W ? "[" + k.call(Rr.call([], re || [], W || []), ": ") + "] " : "");
    return K.length === 0 ? te + "{}" : y ? te + "{" + er(K, y) + "}" : te + "{ " + k.call(K, ", ") + " }";
  }
  return String(r);
};
function Xr(e, r, t) {
  var n = (t.quoteStyle || r) === "double" ? '"' : "'";
  return n + e + n;
}
function xn(e) {
  return H.call(String(e), /"/g, "&quot;");
}
function Ze(e) {
  return J(e) === "[object Array]" && (!E || !(typeof e == "object" && E in e));
}
function In(e) {
  return J(e) === "[object Date]" && (!E || !(typeof e == "object" && E in e));
}
function Ir(e) {
  return J(e) === "[object RegExp]" && (!E || !(typeof e == "object" && E in e));
}
function Nn(e) {
  return J(e) === "[object Error]" && (!E || !(typeof e == "object" && E in e));
}
function Fn(e) {
  return J(e) === "[object String]" && (!E || !(typeof e == "object" && E in e));
}
function Mn(e) {
  return J(e) === "[object Number]" && (!E || !(typeof e == "object" && E in e));
}
function jn(e) {
  return J(e) === "[object Boolean]" && (!E || !(typeof e == "object" && E in e));
}
function Yr(e) {
  if (ce)
    return e && typeof e == "object" && e instanceof Symbol;
  if (typeof e == "symbol")
    return !0;
  if (!e || typeof e != "object" || !Xe)
    return !1;
  try {
    return Xe.call(e), !0;
  } catch {
  }
  return !1;
}
function Cn(e) {
  if (!e || typeof e != "object" || !Qe)
    return !1;
  try {
    return Qe.call(e), !0;
  } catch {
  }
  return !1;
}
var kn = Object.prototype.hasOwnProperty || function(e) {
  return e in this;
};
function V(e, r) {
  return kn.call(e, r);
}
function J(e) {
  return On.call(e);
}
function Ln(e) {
  if (e.name)
    return e.name;
  var r = Pn.call(Rn.call(e), /^function\s*([\w$]+)/);
  return r ? r[1] : null;
}
function Zr(e, r) {
  if (e.indexOf)
    return e.indexOf(r);
  for (var t = 0, n = e.length; t < n; t++)
    if (e[t] === r)
      return t;
  return -1;
}
function Un(e) {
  if (!Ee || !e || typeof e != "object")
    return !1;
  try {
    Ee.call(e);
    try {
      $e.call(e);
    } catch {
      return !0;
    }
    return e instanceof Map;
  } catch {
  }
  return !1;
}
function Bn(e) {
  if (!he || !e || typeof e != "object")
    return !1;
  try {
    he.call(e, he);
    try {
      ve.call(e, ve);
    } catch {
      return !0;
    }
    return e instanceof WeakMap;
  } catch {
  }
  return !1;
}
function Tn(e) {
  if (!Ar || !e || typeof e != "object")
    return !1;
  try {
    return Ar.call(e), !0;
  } catch {
  }
  return !1;
}
function Dn(e) {
  if (!$e || !e || typeof e != "object")
    return !1;
  try {
    $e.call(e);
    try {
      Ee.call(e);
    } catch {
      return !0;
    }
    return e instanceof Set;
  } catch {
  }
  return !1;
}
function Wn(e) {
  if (!ve || !e || typeof e != "object")
    return !1;
  try {
    ve.call(e, ve);
    try {
      he.call(e, he);
    } catch {
      return !0;
    }
    return e instanceof WeakSet;
  } catch {
  }
  return !1;
}
function qn(e) {
  return !e || typeof e != "object" ? !1 : typeof HTMLElement < "u" && e instanceof HTMLElement ? !0 : typeof e.nodeName == "string" && typeof e.getAttribute == "function";
}
function et(e, r) {
  if (e.length > r.maxStringLength) {
    var t = e.length - r.maxStringLength, n = "... " + t + " more character" + (t > 1 ? "s" : "");
    return et(fr.call(e, 0, r.maxStringLength), r) + n;
  }
  var a = H.call(H.call(e, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, zn);
  return Xr(a, "single", r);
}
function zn(e) {
  var r = e.charCodeAt(0), t = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[r];
  return t ? "\\" + t : "\\x" + (r < 16 ? "0" : "") + _n.call(r.toString(16));
}
function de(e) {
  return "Object(" + e + ")";
}
function Ue(e) {
  return e + " { ? }";
}
function Nr(e, r, t, n) {
  var a = n ? er(t, n) : k.call(t, ", ");
  return e + " (" + r + ") {" + a + "}";
}
function Vn(e) {
  for (var r = 0; r < e.length; r++)
    if (Zr(e[r], `
`) >= 0)
      return !1;
  return !0;
}
function Hn(e, r) {
  var t;
  if (e.indent === "	")
    t = "	";
  else if (typeof e.indent == "number" && e.indent > 0)
    t = k.call(Array(e.indent + 1), " ");
  else
    return null;
  return {
    base: t,
    prev: k.call(Array(r + 1), t)
  };
}
function er(e, r) {
  if (e.length === 0)
    return "";
  var t = `
` + r.prev + r.base;
  return t + k.call(e, "," + t) + `
` + r.prev;
}
function Se(e, r) {
  var t = Ze(e), n = [];
  if (t) {
    n.length = e.length;
    for (var a = 0; a < e.length; a++)
      n[a] = V(e, a) ? r(e[a], e) : "";
  }
  var o = typeof Le == "function" ? Le(e) : [], i;
  if (ce) {
    i = {};
    for (var c = 0; c < o.length; c++)
      i["$" + o[c]] = o[c];
  }
  for (var s in e)
    V(e, s) && (t && String(Number(s)) === s && s < e.length || ce && i["$" + s] instanceof Symbol || (Kr.call(/[^\w$]/, s) ? n.push(r(s, e) + ": " + r(e[s], e)) : n.push(s + ": " + r(e[s], e))));
  if (typeof Le == "function")
    for (var l = 0; l < o.length; l++)
      Qr.call(e, o[l]) && n.push("[" + r(o[l]) + "]: " + r(e[o[l]], e));
  return n;
}
var yr = sr, le = hn, Gn = $n, Jn = yr("%TypeError%"), we = yr("%WeakMap%", !0), Ae = yr("%Map%", !0), Kn = le("WeakMap.prototype.get", !0), Qn = le("WeakMap.prototype.set", !0), Xn = le("WeakMap.prototype.has", !0), Yn = le("Map.prototype.get", !0), Zn = le("Map.prototype.set", !0), eo = le("Map.prototype.has", !0), pr = function(e, r) {
  for (var t = e, n; (n = t.next) !== null; t = n)
    if (n.key === r)
      return t.next = n.next, n.next = e.next, e.next = n, n;
}, ro = function(e, r) {
  var t = pr(e, r);
  return t && t.value;
}, to = function(e, r, t) {
  var n = pr(e, r);
  n ? n.value = t : e.next = {
    // eslint-disable-line no-param-reassign
    key: r,
    next: e.next,
    value: t
  };
}, no = function(e, r) {
  return !!pr(e, r);
}, oo = function() {
  var r, t, n, a = {
    assert: function(o) {
      if (!a.has(o))
        throw new Jn("Side channel does not contain " + Gn(o));
    },
    get: function(o) {
      if (we && o && (typeof o == "object" || typeof o == "function")) {
        if (r)
          return Kn(r, o);
      } else if (Ae) {
        if (t)
          return Yn(t, o);
      } else if (n)
        return ro(n, o);
    },
    has: function(o) {
      if (we && o && (typeof o == "object" || typeof o == "function")) {
        if (r)
          return Xn(r, o);
      } else if (Ae) {
        if (t)
          return eo(t, o);
      } else if (n)
        return no(n, o);
      return !1;
    },
    set: function(o, i) {
      we && o && (typeof o == "object" || typeof o == "function") ? (r || (r = new we()), Qn(r, o, i)) : Ae ? (t || (t = new Ae()), Zn(t, o, i)) : (n || (n = { key: {}, next: null }), to(n, o, i));
    }
  };
  return a;
}, ao = String.prototype.replace, io = /%20/g, Be = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
}, dr = {
  default: Be.RFC3986,
  formatters: {
    RFC1738: function(e) {
      return ao.call(e, io, "+");
    },
    RFC3986: function(e) {
      return String(e);
    }
  },
  RFC1738: Be.RFC1738,
  RFC3986: Be.RFC3986
}, co = dr, Te = Object.prototype.hasOwnProperty, X = Array.isArray, j = function() {
  for (var e = [], r = 0; r < 256; ++r)
    e.push("%" + ((r < 16 ? "0" : "") + r.toString(16)).toUpperCase());
  return e;
}(), so = function(r) {
  for (; r.length > 1; ) {
    var t = r.pop(), n = t.obj[t.prop];
    if (X(n)) {
      for (var a = [], o = 0; o < n.length; ++o)
        typeof n[o] < "u" && a.push(n[o]);
      t.obj[t.prop] = a;
    }
  }
}, rt = function(r, t) {
  for (var n = t && t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, a = 0; a < r.length; ++a)
    typeof r[a] < "u" && (n[a] = r[a]);
  return n;
}, lo = function e(r, t, n) {
  if (!t)
    return r;
  if (typeof t != "object") {
    if (X(r))
      r.push(t);
    else if (r && typeof r == "object")
      (n && (n.plainObjects || n.allowPrototypes) || !Te.call(Object.prototype, t)) && (r[t] = !0);
    else
      return [r, t];
    return r;
  }
  if (!r || typeof r != "object")
    return [r].concat(t);
  var a = r;
  return X(r) && !X(t) && (a = rt(r, n)), X(r) && X(t) ? (t.forEach(function(o, i) {
    if (Te.call(r, i)) {
      var c = r[i];
      c && typeof c == "object" && o && typeof o == "object" ? r[i] = e(c, o, n) : r.push(o);
    } else
      r[i] = o;
  }), r) : Object.keys(t).reduce(function(o, i) {
    var c = t[i];
    return Te.call(o, i) ? o[i] = e(o[i], c, n) : o[i] = c, o;
  }, a);
}, uo = function(r, t) {
  return Object.keys(t).reduce(function(n, a) {
    return n[a] = t[a], n;
  }, r);
}, fo = function(e, r, t) {
  var n = e.replace(/\+/g, " ");
  if (t === "iso-8859-1")
    return n.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n);
  } catch {
    return n;
  }
}, yo = function(r, t, n, a, o) {
  if (r.length === 0)
    return r;
  var i = r;
  if (typeof r == "symbol" ? i = Symbol.prototype.toString.call(r) : typeof r != "string" && (i = String(r)), n === "iso-8859-1")
    return escape(i).replace(/%u[0-9a-f]{4}/gi, function(u) {
      return "%26%23" + parseInt(u.slice(2), 16) + "%3B";
    });
  for (var c = "", s = 0; s < i.length; ++s) {
    var l = i.charCodeAt(s);
    if (l === 45 || l === 46 || l === 95 || l === 126 || l >= 48 && l <= 57 || l >= 65 && l <= 90 || l >= 97 && l <= 122 || o === co.RFC1738 && (l === 40 || l === 41)) {
      c += i.charAt(s);
      continue;
    }
    if (l < 128) {
      c = c + j[l];
      continue;
    }
    if (l < 2048) {
      c = c + (j[192 | l >> 6] + j[128 | l & 63]);
      continue;
    }
    if (l < 55296 || l >= 57344) {
      c = c + (j[224 | l >> 12] + j[128 | l >> 6 & 63] + j[128 | l & 63]);
      continue;
    }
    s += 1, l = 65536 + ((l & 1023) << 10 | i.charCodeAt(s) & 1023), c += j[240 | l >> 18] + j[128 | l >> 12 & 63] + j[128 | l >> 6 & 63] + j[128 | l & 63];
  }
  return c;
}, po = function(r) {
  for (var t = [{ obj: { o: r }, prop: "o" }], n = [], a = 0; a < t.length; ++a)
    for (var o = t[a], i = o.obj[o.prop], c = Object.keys(i), s = 0; s < c.length; ++s) {
      var l = c[s], u = i[l];
      typeof u == "object" && u !== null && n.indexOf(u) === -1 && (t.push({ obj: i, prop: l }), n.push(u));
    }
  return so(t), r;
}, ho = function(r) {
  return Object.prototype.toString.call(r) === "[object RegExp]";
}, vo = function(r) {
  return !r || typeof r != "object" ? !1 : !!(r.constructor && r.constructor.isBuffer && r.constructor.isBuffer(r));
}, go = function(r, t) {
  return [].concat(r, t);
}, mo = function(r, t) {
  if (X(r)) {
    for (var n = [], a = 0; a < r.length; a += 1)
      n.push(t(r[a]));
    return n;
  }
  return t(r);
}, tt = {
  arrayToObject: rt,
  assign: uo,
  combine: go,
  compact: po,
  decode: fo,
  encode: yo,
  isBuffer: vo,
  isRegExp: ho,
  maybeMap: mo,
  merge: lo
}, nt = oo, rr = tt, ge = dr, bo = Object.prototype.hasOwnProperty, Fr = {
  brackets: function(r) {
    return r + "[]";
  },
  comma: "comma",
  indices: function(r, t) {
    return r + "[" + t + "]";
  },
  repeat: function(r) {
    return r;
  }
}, T = Array.isArray, So = String.prototype.split, wo = Array.prototype.push, ot = function(e, r) {
  wo.apply(e, T(r) ? r : [r]);
}, Ao = Date.prototype.toISOString, Mr = ge.default, R = {
  addQueryPrefix: !1,
  allowDots: !1,
  charset: "utf-8",
  charsetSentinel: !1,
  delimiter: "&",
  encode: !0,
  encoder: rr.encode,
  encodeValuesOnly: !1,
  format: Mr,
  formatter: ge.formatters[Mr],
  // deprecated
  indices: !1,
  serializeDate: function(r) {
    return Ao.call(r);
  },
  skipNulls: !1,
  strictNullHandling: !1
}, Oo = function(r) {
  return typeof r == "string" || typeof r == "number" || typeof r == "boolean" || typeof r == "symbol" || typeof r == "bigint";
}, De = {}, Ro = function e(r, t, n, a, o, i, c, s, l, u, y, f, v, h, g, $) {
  for (var p = r, x = $, P = 0, N = !1; (x = x.get(De)) !== void 0 && !N; ) {
    var ue = x.get(r);
    if (P += 1, typeof ue < "u") {
      if (ue === P)
        throw new RangeError("Cyclic object value");
      N = !0;
    }
    typeof x.get(De) > "u" && (P = 0);
  }
  if (typeof s == "function" ? p = s(t, p) : p instanceof Date ? p = y(p) : n === "comma" && T(p) && (p = rr.maybeMap(p, function(Ie) {
    return Ie instanceof Date ? y(Ie) : Ie;
  })), p === null) {
    if (o)
      return c && !h ? c(t, R.encoder, g, "key", f) : t;
    p = "";
  }
  if (Oo(p) || rr.isBuffer(p)) {
    if (c) {
      var fe = h ? t : c(t, R.encoder, g, "key", f);
      if (n === "comma" && h) {
        for (var K = So.call(String(p), ","), ye = "", W = 0; W < K.length; ++W)
          ye += (W === 0 ? "" : ",") + v(c(K[W], R.encoder, g, "value", f));
        return [v(fe) + (a && T(p) && K.length === 1 ? "[]" : "") + "=" + ye];
      }
      return [v(fe) + "=" + v(c(p, R.encoder, g, "value", f))];
    }
    return [v(t) + "=" + v(String(p))];
  }
  var re = [];
  if (typeof p > "u")
    return re;
  var Q;
  if (n === "comma" && T(p))
    Q = [{ value: p.length > 0 ? p.join(",") || null : void 0 }];
  else if (T(s))
    Q = s;
  else {
    var te = Object.keys(p);
    Q = l ? te.sort(l) : te;
  }
  for (var M = a && T(p) && p.length === 1 ? t + "[]" : t, q = 0; q < Q.length; ++q) {
    var U = Q[q], pe = typeof U == "object" && typeof U.value < "u" ? U.value : p[U];
    if (!(i && pe === null)) {
      var st = T(p) ? typeof n == "function" ? n(M, U) : M : M + (u ? "." + U : "[" + U + "]");
      $.set(r, P);
      var hr = nt();
      hr.set(De, $), ot(re, e(
        pe,
        st,
        n,
        a,
        o,
        i,
        c,
        s,
        l,
        u,
        y,
        f,
        v,
        h,
        g,
        hr
      ));
    }
  }
  return re;
}, Po = function(r) {
  if (!r)
    return R;
  if (r.encoder !== null && typeof r.encoder < "u" && typeof r.encoder != "function")
    throw new TypeError("Encoder has to be a function.");
  var t = r.charset || R.charset;
  if (typeof r.charset < "u" && r.charset !== "utf-8" && r.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var n = ge.default;
  if (typeof r.format < "u") {
    if (!bo.call(ge.formatters, r.format))
      throw new TypeError("Unknown format option provided.");
    n = r.format;
  }
  var a = ge.formatters[n], o = R.filter;
  return (typeof r.filter == "function" || T(r.filter)) && (o = r.filter), {
    addQueryPrefix: typeof r.addQueryPrefix == "boolean" ? r.addQueryPrefix : R.addQueryPrefix,
    allowDots: typeof r.allowDots > "u" ? R.allowDots : !!r.allowDots,
    charset: t,
    charsetSentinel: typeof r.charsetSentinel == "boolean" ? r.charsetSentinel : R.charsetSentinel,
    delimiter: typeof r.delimiter > "u" ? R.delimiter : r.delimiter,
    encode: typeof r.encode == "boolean" ? r.encode : R.encode,
    encoder: typeof r.encoder == "function" ? r.encoder : R.encoder,
    encodeValuesOnly: typeof r.encodeValuesOnly == "boolean" ? r.encodeValuesOnly : R.encodeValuesOnly,
    filter: o,
    format: n,
    formatter: a,
    serializeDate: typeof r.serializeDate == "function" ? r.serializeDate : R.serializeDate,
    skipNulls: typeof r.skipNulls == "boolean" ? r.skipNulls : R.skipNulls,
    sort: typeof r.sort == "function" ? r.sort : null,
    strictNullHandling: typeof r.strictNullHandling == "boolean" ? r.strictNullHandling : R.strictNullHandling
  };
}, _o = function(e, r) {
  var t = e, n = Po(r), a, o;
  typeof n.filter == "function" ? (o = n.filter, t = o("", t)) : T(n.filter) && (o = n.filter, a = o);
  var i = [];
  if (typeof t != "object" || t === null)
    return "";
  var c;
  r && r.arrayFormat in Fr ? c = r.arrayFormat : r && "indices" in r ? c = r.indices ? "indices" : "repeat" : c = "indices";
  var s = Fr[c];
  if (r && "commaRoundTrip" in r && typeof r.commaRoundTrip != "boolean")
    throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
  var l = s === "comma" && r && r.commaRoundTrip;
  a || (a = Object.keys(t)), n.sort && a.sort(n.sort);
  for (var u = nt(), y = 0; y < a.length; ++y) {
    var f = a[y];
    n.skipNulls && t[f] === null || ot(i, Ro(
      t[f],
      f,
      s,
      l,
      n.strictNullHandling,
      n.skipNulls,
      n.encode ? n.encoder : null,
      n.filter,
      n.sort,
      n.allowDots,
      n.serializeDate,
      n.format,
      n.formatter,
      n.encodeValuesOnly,
      n.charset,
      u
    ));
  }
  var v = i.join(n.delimiter), h = n.addQueryPrefix === !0 ? "?" : "";
  return n.charsetSentinel && (n.charset === "iso-8859-1" ? h += "utf8=%26%2310003%3B&" : h += "utf8=%E2%9C%93&"), v.length > 0 ? h + v : "";
}, se = tt, tr = Object.prototype.hasOwnProperty, Eo = Array.isArray, w = {
  allowDots: !1,
  allowPrototypes: !1,
  allowSparse: !1,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: !1,
  comma: !1,
  decoder: se.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: !1,
  interpretNumericEntities: !1,
  parameterLimit: 1e3,
  parseArrays: !0,
  plainObjects: !1,
  strictNullHandling: !1
}, $o = function(e) {
  return e.replace(/&#(\d+);/g, function(r, t) {
    return String.fromCharCode(parseInt(t, 10));
  });
}, at = function(e, r) {
  return e && typeof e == "string" && r.comma && e.indexOf(",") > -1 ? e.split(",") : e;
}, xo = "utf8=%26%2310003%3B", Io = "utf8=%E2%9C%93", No = function(r, t) {
  var n = {}, a = t.ignoreQueryPrefix ? r.replace(/^\?/, "") : r, o = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit, i = a.split(t.delimiter, o), c = -1, s, l = t.charset;
  if (t.charsetSentinel)
    for (s = 0; s < i.length; ++s)
      i[s].indexOf("utf8=") === 0 && (i[s] === Io ? l = "utf-8" : i[s] === xo && (l = "iso-8859-1"), c = s, s = i.length);
  for (s = 0; s < i.length; ++s)
    if (s !== c) {
      var u = i[s], y = u.indexOf("]="), f = y === -1 ? u.indexOf("=") : y + 1, v, h;
      f === -1 ? (v = t.decoder(u, w.decoder, l, "key"), h = t.strictNullHandling ? null : "") : (v = t.decoder(u.slice(0, f), w.decoder, l, "key"), h = se.maybeMap(
        at(u.slice(f + 1), t),
        function(g) {
          return t.decoder(g, w.decoder, l, "value");
        }
      )), h && t.interpretNumericEntities && l === "iso-8859-1" && (h = $o(h)), u.indexOf("[]=") > -1 && (h = Eo(h) ? [h] : h), tr.call(n, v) ? n[v] = se.combine(n[v], h) : n[v] = h;
    }
  return n;
}, Fo = function(e, r, t, n) {
  for (var a = n ? r : at(r, t), o = e.length - 1; o >= 0; --o) {
    var i, c = e[o];
    if (c === "[]" && t.parseArrays)
      i = [].concat(a);
    else {
      i = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var s = c.charAt(0) === "[" && c.charAt(c.length - 1) === "]" ? c.slice(1, -1) : c, l = parseInt(s, 10);
      !t.parseArrays && s === "" ? i = { 0: a } : !isNaN(l) && c !== s && String(l) === s && l >= 0 && t.parseArrays && l <= t.arrayLimit ? (i = [], i[l] = a) : s !== "__proto__" && (i[s] = a);
    }
    a = i;
  }
  return a;
}, Mo = function(r, t, n, a) {
  if (r) {
    var o = n.allowDots ? r.replace(/\.([^.[]+)/g, "[$1]") : r, i = /(\[[^[\]]*])/, c = /(\[[^[\]]*])/g, s = n.depth > 0 && i.exec(o), l = s ? o.slice(0, s.index) : o, u = [];
    if (l) {
      if (!n.plainObjects && tr.call(Object.prototype, l) && !n.allowPrototypes)
        return;
      u.push(l);
    }
    for (var y = 0; n.depth > 0 && (s = c.exec(o)) !== null && y < n.depth; ) {
      if (y += 1, !n.plainObjects && tr.call(Object.prototype, s[1].slice(1, -1)) && !n.allowPrototypes)
        return;
      u.push(s[1]);
    }
    return s && u.push("[" + o.slice(s.index) + "]"), Fo(u, t, n, a);
  }
}, jo = function(r) {
  if (!r)
    return w;
  if (r.decoder !== null && r.decoder !== void 0 && typeof r.decoder != "function")
    throw new TypeError("Decoder has to be a function.");
  if (typeof r.charset < "u" && r.charset !== "utf-8" && r.charset !== "iso-8859-1")
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  var t = typeof r.charset > "u" ? w.charset : r.charset;
  return {
    allowDots: typeof r.allowDots > "u" ? w.allowDots : !!r.allowDots,
    allowPrototypes: typeof r.allowPrototypes == "boolean" ? r.allowPrototypes : w.allowPrototypes,
    allowSparse: typeof r.allowSparse == "boolean" ? r.allowSparse : w.allowSparse,
    arrayLimit: typeof r.arrayLimit == "number" ? r.arrayLimit : w.arrayLimit,
    charset: t,
    charsetSentinel: typeof r.charsetSentinel == "boolean" ? r.charsetSentinel : w.charsetSentinel,
    comma: typeof r.comma == "boolean" ? r.comma : w.comma,
    decoder: typeof r.decoder == "function" ? r.decoder : w.decoder,
    delimiter: typeof r.delimiter == "string" || se.isRegExp(r.delimiter) ? r.delimiter : w.delimiter,
    // eslint-disable-next-line no-implicit-coercion, no-extra-parens
    depth: typeof r.depth == "number" || r.depth === !1 ? +r.depth : w.depth,
    ignoreQueryPrefix: r.ignoreQueryPrefix === !0,
    interpretNumericEntities: typeof r.interpretNumericEntities == "boolean" ? r.interpretNumericEntities : w.interpretNumericEntities,
    parameterLimit: typeof r.parameterLimit == "number" ? r.parameterLimit : w.parameterLimit,
    parseArrays: r.parseArrays !== !1,
    plainObjects: typeof r.plainObjects == "boolean" ? r.plainObjects : w.plainObjects,
    strictNullHandling: typeof r.strictNullHandling == "boolean" ? r.strictNullHandling : w.strictNullHandling
  };
}, Co = function(e, r) {
  var t = jo(r);
  if (e === "" || e === null || typeof e > "u")
    return t.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n = typeof e == "string" ? No(e, t) : e, a = t.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, o = Object.keys(n), i = 0; i < o.length; ++i) {
    var c = o[i], s = Mo(c, n[c], t, typeof e == "string");
    a = se.merge(a, s, t);
  }
  return t.allowSparse === !0 ? a : se.compact(a);
}, ko = _o, Lo = Co, Uo = dr, Bo = {
  formats: Uo,
  parse: Lo,
  stringify: ko
};
const To = /* @__PURE__ */ qt(Bo);
var it = /* @__PURE__ */ ((e) => (e.Encoding = "accept-encoding", e.Language = "accept-language", e.ContentType = "content-type", e.RequestedWith = "X-Requested-With", e.Authorization = "authorization", e.TokenAccess = "access_token", e.TokenRefresh = "refresh_token", e))(it || {}), Do = /* @__PURE__ */ ((e) => (e.Json = "application/json", e.Form = "application/x-www-form-urlencoded", e))(Do || {}), Wo = /* @__PURE__ */ ((e) => (e.Ajax = "XMLHttpRequest", e))(Wo || {}), qo = /* @__PURE__ */ ((e) => (e.H = "zh-CN", e))(qo || {}), Oa = /* @__PURE__ */ ((e) => {
})();
const We = {
  enable() {
    return !1;
  },
  hookVerify(e, r) {
    const t = e.code;
    this.enable() && G(t) && ((t.startsWith("TOKEN_") || t.startsWith("CREDENTIAL_")) && (L.remove(
      "authorization"
      /* Authorization */
    ), this.hookLoginFailure(e, r)), t === "LOGINED_AUTHORITY" && this.hookUnauthorized(e, r), t.startsWith("ERROR_") && this.hookErrorUnknown(e, r));
  },
  hookResponseHeader(e) {
    Reflect.has(
      e,
      "authorization"
      /* Authorization */
    ) && L.set("authorization", Reflect.get(
      e,
      "authorization"
      /* Authorization */
    ));
  },
  hookResponseDataParseFailure(e, r) {
    throw new F(JSON.stringify({ body: e, headers: r }), Y.error);
  },
  hookLoginFailure(e, r) {
    throw m.warn(`请实现回调函数：Security.${this.hookLoginFailure.name}`, e, r), new F("回话失效, 请重新登录...", Y.info);
  },
  hookUnauthorized(e, r) {
    throw m.warn(`请实现回调函数：Security.${this.hookUnauthorized.name}`, e, r), new F("无权访问，请检查权限...", Y.info);
  },
  hookErrorUnknown(e, r) {
    throw m.warn(`请实现回调函数：Security.${this.hookErrorUnknown.name}`, e, r), new F(e.message, Y.error);
  }
};
function ct(e) {
  return Promise.reject(e);
}
const jr = {
  resolve(e) {
    m.debug("-----interceptor-Request------ config-before -> ", e);
    const r = {
      [
        "content-type"
        /* ContentType */
      ]: "application/json",
      [
        "X-Requested-With"
        /* RequestedWith */
      ]: "XMLHttpRequest",
      authorization: L.get(
        "authorization"
        /* Authorization */
      ),
      access_token: L.get(
        "access_token"
        /* TokenAccess */
      ),
      refresh_token: L.get(
        "refresh_token"
        /* TokenRefresh */
      )
    };
    {
      const t = L.get(
        "accept-language"
        /* Language */
      );
      I(t) === !1 && Reflect.set(r, "accept-language", t);
    }
    return I(e.headers) === !1 && Je(r, e.headers, { deep: !0 }), Reflect.set(e, "headers", r), Reflect.get(
      r,
      "content-type"
      /* ContentType */
    ) === "application/json" && Reflect.set(e, "data", JSON.stringify(e.data)), m.debug("-----interceptor-Request------ config-after ->", e), e;
  },
  reject: ct
}, Cr = {
  resolve(e) {
    const r = e.headers;
    try {
      if (We.hookResponseHeader(r), Reflect.has(r, "ignore-parse"))
        return e.data;
      if (G(e.data) === !1)
        return We.hookResponseDataParseFailure(e.data, r);
      const t = JSON.parse(e.data);
      return t.success === !0 ? t.data : (t.success === !1 && We.hookVerify(t, r), Promise.reject({ body: t, headers: r }));
    } catch (t) {
      return t instanceof F ? Reflect.get(console, t.type).call(console, t) : t instanceof Error ? Promise.reject(t.message) : t instanceof Promise ? t : Promise.reject(t);
    }
  },
  reject: ct
}, zo = {
  baseURL: "/api/",
  timeout: 6e4,
  paramsSerializer: {
    serialize(e) {
      return To.stringify(e, { arrayFormat: "repeat" });
    }
  }
};
class Vo extends ft {
  constructor(r, t) {
    super(t ? Je(zo, r || {}, { deep: !0 }) : r), t && (m.debug("使用默认配置，并默认配置优先级较高..."), this.setInterceptorToRequeset(jr.resolve, jr.reject), this.setInterceptorToResponse(Cr.resolve, Cr.reject));
  }
  setConfig(r) {
    Je(this.defaults, r, { deep: !0 });
  }
  setInterceptorToResponse(r, t) {
    this.interceptors.response.use(r, t);
  }
  setInterceptorToRequeset(r, t) {
    this.interceptors.request.use(r, t);
  }
  /**
   * get
   * @param url 请求 地址
   * @param params 请求数据
   * @param config 可选配置
   * @returns 
   */
  get(r, t, n) {
    return this.request({ url: r, method: "get", params: t, ...n });
  }
  /**
   * post
   * @param url 请求 地址
   * @param data 请求数据
   * @param config 可选配置
   * @returns 
   */
  post(r, t, n) {
    return this.request({ url: r, method: "post", data: t, ...n });
  }
  /**
   * put
   * @param url 请求 地址
   * @param data 请求数据
   * @param config 可选配置
   * @returns 
   */
  put(r, t, n) {
    return this.request({ url: r, method: "put", data: t, ...n });
  }
  /**
   * delete
   * @param url 请求 地址
   * @param params 请求数据
   * @param config 可选配置
   * @returns 
   */
  delete(r, t, n) {
    return this.request({ url: r, method: "delete", params: t, ...n });
  }
  /**
   * patch
   * @param url 请求 地址
   * @param data 请求数据
   * @param config 可选配置
   * @returns 
   */
  patch(r, t, n) {
    return this.request({ url: r, method: "patch", data: t, ...n });
  }
}
const Ra = new Vo({}, !0);
function Pa(e, r) {
  const t = e.classList;
  return S(t) ? !1 : t.contains(r);
}
function _a(e, r) {
  const t = e.classList;
  t.contains(r) === !1 && t.add(r);
}
function Ea(e, r) {
  const t = e.classList;
  t.contains(r) && t.remove(r);
}
function Ho(e, r) {
  if (m.debug("gold-core：RouterVue —— inintRouteRecord"), r) {
    const t = "/src/views", n = "Route.vue", a = [];
    for (const o of Object.keys(r)) {
      const i = Tr(o.replace(t, "").replace(n, ""));
      e.addRoute({ path: i, component: Reflect.get(r, o) }), a.push({ path: i, component: Reflect.get(r, o) });
    }
    L.set("route-record-list", a.map(({ path: o }) => o));
  }
}
const D = {
  enable() {
    return !1;
  },
  beforeEach(e, r) {
    return m.warn(`请实现回调函数：SecurityRouter.${D.beforeEach.name}`, me(e.fullPath).searchParams.get("token"), r), !0;
  },
  beforeResolve(e) {
    return m.warn(`请实现回调函数：SecurityRouter.${D.beforeEach.name}`, e), !0;
  },
  afterEach(e, r, t) {
    m.warn(`请实现回调函数：SecurityRouter.${D.afterEach.name}`, e, r, t);
  }
};
function $a(e) {
  const r = yt(Object.assign({ history: pt() }, e));
  return r.beforeEach((t, n) => {
    if (m.debug("gold-core：RouterVue —— beforeEach"), D.enable())
      return D.beforeEach(t, n);
  }), r.beforeResolve((t) => {
    if (m.debug("gold-core：RouterVue —— beforeResolve"), D.enable())
      return D.beforeResolve(t);
  }), r.afterEach((t, n, a) => {
    if (m.debug("gold-core：RouterVue —— afterEach"), D.enable())
      return D.afterEach(t, n, a);
  }), Ho(r, e.modules), r;
}
function xa() {
  const e = defineProps({
    modelValue: [String, Boolean]
  }), r = O(e.modelValue), t = defineEmits(["update:modelValue"]);
  return qe(() => e.modelValue, (n) => r.value = n), qe(() => r.value, (n) => t("update:modelValue", n)), r;
}
function Ia() {
  const e = O(!1), r = O(!1), t = O(!1);
  return { statusAdd: e, statusUpdate: r, statusDetail: t };
}
function Na() {
  const e = O(), r = O(), t = O(), n = O();
  return { primaryKeyAdd: e, primaryKeyRemove: r, primaryKeyUpdate: t, primaryKeyDetail: n };
}
function Fa() {
  const e = O(), r = O(), t = O(), n = O(), a = O();
  return { refForm: e, refFormList: r, refFormAdd: t, refFormUpdate: n, refFormDetail: a };
}
function Ma() {
  const r = O(), t = O();
  function n() {
    const { height: a } = Tt(z(t));
    r.value = 300 < a ? Math.floor(a) : 300;
  }
  return { containerHeight: r, containerTarget: t, containerInitialize: n };
}
function ja() {
  const e = O([]);
  function r(t) {
    e.value = t;
  }
  return { selectionMultiple: e, selectionChange: r };
}
function Ca() {
  const e = dt({ list: [], total: 0 });
  Oe("modelResult", e);
  const r = { pageSize: 20, pageNum: 1 };
  return Oe("modelPagination", r), { modelResult: e, modelPagination: r };
}
function Go(e, r) {
  const t = me(e);
  m.debug(`gold-core：composable.Frame —— tabPaneAdd：${t.href}`), globalThis.top.postMessage(Object.assign(r || {}, { action: "tab-pane-add", href: t.href }), "*");
}
function ka(e) {
  globalThis.top.postMessage({ action: "tab-pane-close", code: e }, "*");
}
function La(e) {
  const r = O([]), t = O("");
  globalThis.window.addEventListener("message", ({ data: i }) => {
    if ((i == null ? void 0 : i.action) === "tab-pane-add")
      return n(i, e);
    if ((i == null ? void 0 : i.action) === "tab-pane-close")
      return o(i);
  });
  function n(i, c) {
    return a(i, c), !0;
  }
  function a(i, c) {
    var x;
    const { href: s, label: l, code: u, refresh: y, target: f, closable: v, mode: h } = i || {}, g = me(i == null ? void 0 : i.href);
    if (f === "_blank")
      return globalThis.top.open(s), !0;
    const $ = I(u) ? g.origin + g.pathname + g.hash : u, p = (x = z(r)) == null ? void 0 : x.find(({ code: P }) => $ === P);
    if (c != null && c.sso && g.origin !== globalThis.top.location.origin) {
      const P = g.searchParams, N = "token";
      P.delete(N), P.append(N, L.get(it.Authorization, { defaultValue: "" }));
    }
    if (p === void 0 || I(p)) {
      if (c.max && z(r).length >= c.max) {
        const P = z(r).findIndex(({ closable: N }) => N === !0);
        P >= 0 && z(r).splice(P, 1);
      }
      z(r).push({ label: l, href: g.href, code: $, closable: v, mode: h });
    } else
      y === !0 && g.searchParams.set("v", (/* @__PURE__ */ new Date()).getTime() + ""), Reflect.set(p, "href", g.href), Reflect.set(p, "label", l), Reflect.set(p, "refresh", y), Reflect.set(p, "closable", v), Reflect.set(p, "code", u), Reflect.set(p, "mode", h);
    t.value = $;
  }
  function o(i) {
    var s;
    const c = (s = z(r)) == null ? void 0 : s.filter((l) => i.code !== l.code);
    if (c instanceof Array) {
      r.value = c;
      const [l] = [...c].reverse();
      t.value = l.code;
    }
  }
  return Oe("list-route", r), Oe("tab-activate", t), e.cacheable === !0 && (qe(() => t.value, (i) => {
    const c = z(r).find((s) => s.code === i);
    c && L.set("tab-activate", c);
  }), ht(async () => {
    await vt();
    const i = L.get("tab-activate");
    S(i) || Go(i.href, i);
  })), { listRoute: r, activate: t };
}
export {
  ta as Assert,
  na as Convert,
  mt as EnumColor,
  Y as EnumConsole,
  Do as EnumContentType,
  ze as EnumDirection,
  Oa as EnumEncoding,
  Ve as EnumFormat,
  it as EnumHeader,
  qo as EnumLanguage,
  Ur as EnumOrder,
  Wo as EnumRequestedWith,
  gt as EnumTime,
  A as EnumType,
  F as ErrorConsole,
  Zo as ErrorView,
  bt as FileSuffix,
  Vo as Http,
  We as HttpSecurity,
  Aa as Layout,
  m as ProxyConsole,
  D as SecurityRouter,
  Yo as Type,
  sa as UUID,
  _a as addClass,
  Je as assign,
  Ge as assignArray,
  Re as assignObject,
  ca as clearEmpty,
  ha as clientHeight,
  Tt as clientRect,
  va as clone,
  ga as cookie,
  $a as createRouterVue,
  aa as decryption,
  qr as encryption,
  Bt as equal,
  ia as findPath,
  _ as getType,
  Pa as hasClass,
  ua as hasScrollBar,
  Ra as http,
  la as includes,
  nr as isArray,
  $t as isAsyncFunction,
  I as isBlank,
  At as isBlog,
  Ot as isBoolean,
  St as isDate,
  S as isEmpty,
  It as isError,
  wt as isFile,
  Et as isFunction,
  Rt as isNumber,
  b as isObject,
  Pt as isObjectOrArray,
  xt as isPromise,
  _t as isRegExp,
  G as isString,
  wa as local,
  ma as message,
  ra as notBlankArray,
  ea as notBlankObject,
  pa as parse,
  ba as parseMessage,
  Ea as removeClass,
  fa as scrollBarWidth,
  Sa as sendRedirect,
  L as session,
  oa as sorting,
  ya as stringify,
  ir as stringifyArray,
  ar as stringifyObject,
  Go as tabPaneAdd,
  ka as tabPaneClose,
  Wr as toFirstCharLowerCase,
  Dr as toFirstCharUpperCase,
  Tr as toJoin,
  Br as toLowerCamelCase,
  Ut as toNumber,
  He as toPathFormat,
  me as toURL,
  or as toUpperCamelCase,
  Nt as trim,
  da as urlParam,
  Ma as useContainer,
  Fa as useForm,
  La as useFrame,
  Ca as useModel,
  Na as usePrimaryKey,
  Ia as useStatus,
  ja as useTable,
  xa as useVModel
};
//# sourceMappingURL=index.js.map
