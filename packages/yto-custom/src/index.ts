import "windi.css";
import installer from "./defaults";

export * from "./component";
export * from "./_utils";
export const install = installer.install;
export const version = installer.version;

export default installer;
