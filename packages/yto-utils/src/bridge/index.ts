import { JsBridge } from "./basic"
class Bridge {
  private isCallback = false //回调方法是否返回值
  constructor() {
    console.log("JsBridge.first：setupWebViewJavascriptBridge")
    JsBridge.first();
  }
  callHandler(funName, params) {
    this.isCallback = false
    return new Promise<any>((resolve, reject) => {
      try {
        JsBridge.init((bridge: any) => {
          console.log("JsBridge.init：setupWebViewJavascriptBridge", bridge)
          bridge.registerHandler(funName, (data, responseCallback) => {
            responseCallback(data);
          });
          bridge.callHandler(funName, params, (res: any) => {
            this.isCallback = true;
            resolve(res)
          })
          setTimeout(() => {
            if (!this.isCallback) resolve('返回值为空')
          }, 3 * 1000)
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}
const brdige = new Bridge()

export {
  brdige
}