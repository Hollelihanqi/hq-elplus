import * as components from "./component";
import { makeInstaller } from "./make-installer";

console.log("components", components);
export default makeInstaller(components as any);
