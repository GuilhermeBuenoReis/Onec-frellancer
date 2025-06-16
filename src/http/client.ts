import { env } from '@/env';
import axios, { type AxiosRequestConfig } from 'axios';

export async function http<T>(config: AxiosRequestConfig): Promise<T> {
  const baseUrl = env.VITE_API_URL || `${env.VITE_API_URL}`;
  const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  try {
    const response = await instance.request<T>(config);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || 'Unknown error';
    return Promise.reject(new Error(message));
  }
}
