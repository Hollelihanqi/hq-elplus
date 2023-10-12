import { NavigationFailure, RouteLocationNormalized, Router, RouteRecordRaw, RouterHistory } from 'vue-router';
export interface ISecurityRouter {
    enable: () => boolean;
    enableAuthority?: () => boolean;
    beforeEach: (to: RouteLocationNormalized, form: RouteLocationNormalized) => any;
    beforeResolve: (to: RouteLocationNormalized) => any;
    afterEach: (to: RouteLocationNormalized, from: RouteLocationNormalized, failure?: NavigationFailure) => any;
}
export interface IOptionRouter {
    history?: RouterHistory;
    modules?: object;
    routes: RouteRecordRaw[];
}
export declare const SecurityRouter: ISecurityRouter;
export declare function createRouterVue(option: IOptionRouter): Router;
