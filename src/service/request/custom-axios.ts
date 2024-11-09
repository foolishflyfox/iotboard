import type { HttpResult } from '@/types/request';
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

function isSuccessCode(code: number) {
  return code === 200 || code < 300 || code === 304;
}

export class CustomAxiosInstance {
  private instance: AxiosInstance;

  constructor(axiosConfig: AxiosRequestConfig) {
    this.instance = createAxiosInstance(axiosConfig);
  }

  async get<T>(url: string, config?: AxiosRequestConfig<any>) {
    const result = (await this.instance.get(url, config)) as T;
    return result;
  }

  /** post 通常用于新增操作 */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const result = (await this.instance.post(url, data, config)) as T;
    return result;
  }
}

export function createAxiosInstance(axiosConfig: AxiosRequestConfig) {
  const instance = axios.create(axiosConfig);
  // 设置请求拦截器
  instance.interceptors.request.use(
    async function (config) {
      // 修改请求信息，如为请求头添加 token 字段
      return config;
    },
    function (error: AxiosError) {
      // 对请求错误的处理
      return Promise.reject(error);
    },
  );
  // 设置响应拦截器
  instance.interceptors.response.use(
    async function (response) {
      const { status } = response;
      let errorMsg = '';
      if (isSuccessCode(status)) {
        const data: HttpResult<any> = response.data;
        if (isSuccessCode(data.code)) {
          return data.result;
        } else {
          errorMsg = data.msg!;
        }
      }
      errorMsg = `请求 ${response.config.baseURL} 失败: ${errorMsg}`;
      return Promise.reject(new Error(errorMsg));
    },
    function (error: AxiosError) {
      window.$message?.error(`请求 ${error.config?.baseURL} 失败: ${error.message}`);
      return Promise.reject(error);
    },
  );
  return instance;
}
