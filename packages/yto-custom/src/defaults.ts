import * as components from "./components";
import { makeInstaller } from "./make-installer";

console.log("components", components);

export default makeInstaller(components as any);
