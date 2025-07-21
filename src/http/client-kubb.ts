import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

export type RequestConfig<
  TData = unknown,
  _TError = unknown,
  _TVariables = unknown,
> = {
  url: string;
  method: 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE';
  params?: object;
  data?: TData | FormData;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  signal?: AbortSignal;
  headers?: HeadersInit;
};

export type ResponseConfig<
  TData = unknown,
  _TError = unknown,
  _TVariables = unknown,
> = {
  data: TData;
  status: number;
  statusText: string;
};

export type ResponseErrorConfig<
  TData = unknown,
  _TError = unknown,
  _TVariables = unknown,
> = {
  data: TData;
  status: number;
  statusText: string;
};
export function getHeaders(headers?: HeadersInit): Record<string, string> {
  let resultHeaders: Record<string, string> = {};

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      resultHeaders[key] = value;
    });
  } else if (Array.isArray(headers)) {
    headers.forEach(([key, value]) => {
      resultHeaders[key] = value;
    });
  } else if (headers && typeof headers === 'object') {
    resultHeaders = { ...headers } as Record<string, string>;
  }

  return resultHeaders;
}

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
});

async function client<TData = unknown, TError = unknown, TVariables = unknown>(
  config: RequestConfig<TVariables, TError, TVariables>
): Promise<ResponseConfig<TData, TError, TVariables>> {
  const headers = getHeaders(config.headers);

  const axiosConfig: AxiosRequestConfig = {
    url: config.url,
    method: config.method,
    params: config.params,
    data: config.data,
    headers,
    responseType: config.responseType ?? 'json',
    signal: config.signal,
  };

  try {
    const response: AxiosResponse<TData> =
      await axiosInstance.request<TData>(axiosConfig);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error: any) {
    if (error.response) {
      throw {
        data: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      } as ResponseErrorConfig<TData, TError, TVariables>;
    }
    throw error;
  }
}

export { client };
export default client;
