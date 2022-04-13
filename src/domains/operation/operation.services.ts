import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../../models/ApiResponse';

export const updateFileNameRequest = async (
  name: string,
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    onUploadProgress: progressCallback,
    validateStatus: (status) => true,
  };
  const file = {
    name: name,
  };
  const response = await axios.post('/api/operations', file, config);

  return response.data;
};

export const getFileNameRequest = async (
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'application/json' },
    onUploadProgress: progressCallback,
    validateStatus: (status) => true,
  };
  const response = await axios.get('/api/operations');

  console.log(response.data);

  return response.data;
};
