import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosError, AxiosRequestConfig } from 'axios';

import { apiClient } from './apiClient';

export const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
  }> =>
  async ({ url, method, data }) => {
    try {
      const response = await apiClient({ url, method, data });
      return { data: response?.data ?? null };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: error.response?.data ?? null,
      };
    }
  };
