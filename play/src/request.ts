import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ElMessage } from "element-plus";
type Result<T> = {
  code: number;
  message: string;
  result: T;
};

export const baseConfig = {
  baseURL: "/api",
  timeout: 50000,
  withCredentials: true,
};

export class RequestHttp {
  instance: AxiosInstance;
  resInterceptors: any;
  constructor(config: AxiosRequestConfig) {
    // 创建 axios 实例
    console.log("config", config)
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        console.log("config2", error)
        // return Promise.reject(error);
      }
    );

    // this.resInterceptors = this.instance.interceptors.response.use(
    //   (res: AxiosResponse) => {
    //     console.log("resusule___", res)
    //     if (res.status === 200 && (res.data.success || res.data.status === 0)) {
    //       return Promise.resolve(res.data.data);
    //     } else {
    //       ElMessage.error(res.data.message);
    //       return Promise.reject(res.data);
    //     }
    //   },
    //   (error: AxiosError) => {
    //     return Promise.reject(error.response);
    //   }
    // );
  }

  // 定义请求方法

  public removeResponseInterceptors() {
    this.instance.interceptors.response.eject(this.resInterceptors);
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config);
  }
}

export default new RequestHttp(baseConfig);
