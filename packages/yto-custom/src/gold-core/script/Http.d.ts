import { Axios, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { TypeVoid } from './DefineType';
/**
   * Header 常用 key
   */
export declare enum EnumHeader {
    Encoding = "accept-encoding",
    Language = "accept-language",
    ContentType = "content-type",
    RequestedWith = "X-Requested-With",
    Authorization = "authorization",
    TokenAccess = "access_token",
    TokenRefresh = "refresh_token"
}
/**
 * Header ContentType value
 */
export declare enum EnumContentType {
    Json = "application/json",
    Form = "application/x-www-form-urlencoded"
}
/**
 * Header RequestedWith value
 */
export declare enum EnumRequestedWith {
    Ajax = "XMLHttpRequest"
}
/**
 * Header Language value
 */
export declare enum EnumLanguage {
    H = "zh-CN"
}
/**
 * Header Encoding value
 */
export declare enum EnumEncoding {
}
export interface IBody<T = any> {
    success?: boolean;
    code?: string;
    message?: string;
    data?: T;
}
export interface IHeader {
    [EnumHeader.Encoding]?: string | EnumEncoding;
    [EnumHeader.Language]?: string | EnumLanguage;
    [EnumHeader.ContentType]?: string | EnumContentType;
    [EnumHeader.RequestedWith]?: string | EnumRequestedWith;
    [EnumHeader.Authorization]?: string;
    [EnumHeader.TokenAccess]?: string;
    [EnumHeader.TokenRefresh]?: string;
    [key: string]: any;
}
export interface ISecurity {
    enable: () => boolean;
    hookVerify: (body: IBody, headers: IHeader) => TypeVoid;
    hookResponseHeader: (headers: IHeader) => TypeVoid;
    hookResponseDataParseFailure: (body: any, headers: IHeader) => TypeVoid;
    hookLoginFailure: (body: IBody, headers: IHeader) => TypeVoid;
    hookUnauthorized: (body: IBody, headers: IHeader) => TypeVoid;
    hookErrorUnknown: (body: IBody, headers: IHeader) => TypeVoid;
}
export declare const HttpSecurity: ISecurity;
/**
 * Axios 扩展
 */
export default class Http extends Axios {
    constructor(config?: AxiosRequestConfig, userDefault?: boolean);
    setConfig(config: AxiosRequestConfig): void;
    setInterceptorToResponse(resolve: (value: AxiosResponse<any, any>) => AxiosResponse<any, any>, reject?: (error: any) => any): void;
    setInterceptorToRequeset(resolve: (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any>, reject?: (error: any) => any): void;
    /**
     * get
     * @param url 请求 地址
     * @param params 请求数据
     * @param config 可选配置
     * @returns
     */
    get<T, R = AxiosResponse<T> | T>(url: string, params?: any, config?: any): Promise<R>;
    /**
     * post
     * @param url 请求 地址
     * @param data 请求数据
     * @param config 可选配置
     * @returns
     */
    post<T, R = AxiosResponse<T> | T>(url: string, data?: any, config?: any): Promise<R>;
    /**
     * put
     * @param url 请求 地址
     * @param data 请求数据
     * @param config 可选配置
     * @returns
     */
    put<T, R = AxiosResponse<T> | T>(url: string, data?: any, config?: any): Promise<R>;
    /**
     * delete
     * @param url 请求 地址
     * @param params 请求数据
     * @param config 可选配置
     * @returns
     */
    delete<T, R = AxiosResponse<T> | T>(url: string, params?: any, config?: any): Promise<R>;
    /**
     * patch
     * @param url 请求 地址
     * @param data 请求数据
     * @param config 可选配置
     * @returns
     */
    patch<T, R = AxiosResponse<T> | T>(url: string, data?: any, config?: any): Promise<R>;
}
export declare const http: Http;
