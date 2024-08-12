import installer from "./defaults";
export * from "@yto-uplus/components";
// export * from "@element-plus/directives";
// export * from "@element-plus/hooks";
export * from "./make-installer";

export const install = installer.install;
export const version = installer.version;
export default installer;
