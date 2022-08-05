import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { Character, NewCharacterProps } from '../../../shared/types/Character';
import config from '../../config';

export interface RequestError {
  statusCode: number;
  message: string;
}

export interface RequestResponse {
  error?: RequestError;
  data?: any;
  retry?: boolean;
}

export interface RequestProps {
  method: string;
  route: string;
  data?: any;
}

export const request = async (
  props: RequestProps,
): Promise<RequestResponse> => {
  const { method, route, data } = props;
  try {
    const headers: AxiosRequestHeaders = {};

    const token = localStorage.getItem(config.localStorageTokenName);
    if (token) {
      headers.authorization = token;
    }

    const result = await axios.request({
      method,
      url: `${config.apiUrl}${route}`,
      data,
      headers,
    });
    // only return the data object as we do not want all the rest
    return { data: result.data };
  } catch (e: any) {
    if (e.code === 'ERR_NETWORK') {
      // in this case, we want the client to retry because the server is not responding
      return { retry: true };
    }
    const error: RequestError = e.response?.data
      ? {
          statusCode: e.response.status,
          message: e.response.data.message,
        }
      : {
          statusCode: 500,
          message: 'an unknown error occurred.',
        };
    return { error };
  }
};
