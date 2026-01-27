import Axios from 'axios';
import { baseURL, apiKey } from '@/env.ts';
import { logger } from '@/utils/Logger';

export const api = Axios.create({
  baseURL,
  timeout: 8000,
  params: {
    api_key: apiKey,
  }
});

api.interceptors.request.use(config => config, handleAxiosError);
api.interceptors.response.use(response => response, handleAxiosError);

function handleAxiosError(error: any){
  if (error.response) {
    logger.warn('[📡 AXIOS_ERROR_RESPONSE_DATA]', error.response.data);
  } else if (error.request){
    logger.warn('[📡 AXIOS_ERROR_NO_RESPONSE]', error.request);
  } else {
    logger.warn('[📡 AXIOS_ERROR_INVALID_REQUEST]', error.message);
  }
  return Promise.reject(error);
}