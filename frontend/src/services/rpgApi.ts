import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
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

const request = async (props: RequestProps): Promise<RequestResponse> => {
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

export const login = (email: string, password: string) => {
  const credentials = btoa(`${email}:${password}`);
  return request({ method: 'POST', route: '/login', data: { credentials } });
};

export const logout = () => {
  return request({ method: 'GET', route: '/logout' });
};

export const isAlive = () => {
  console.debug('WHos calling?');
  return request({ method: 'GET', route: '/alive' });
};

export const register = (email: string, password: string) => {
  const credentials = btoa(`${email}:${password}`);
  return request({ method: 'POST', route: '/register', data: { credentials } });
};

export const forget = (email: string) => {
  return request({ method: 'POST', route: '/forget', data: { email } });
};

export const remember = (token: string, password: string) => {
  const credentials = btoa(`${token}:${password}`);
  return request({ method: 'POST', route: '/remember', data: { credentials } });
};

export const verify = (token: string, password: string) => {
  const credentials = btoa(`${token}:${password}`);
  return request({ method: 'POST', route: '/verify', data: { credentials } });
};

export const getMe = () => {
  return request({ method: 'GET', route: '/me' });
};

export const updateMe = (data: any) => {
  return request({ method: 'POST', route: '/me', data });
};

export const getCharacters = () => {
  return request({ method: 'GET', route: '/characters' });
};

export const getGameEntity = (entityName: string) => {
  return request({ method: 'GET', route: `/game/${entityName}` });
};

export const getGameEntityById = (
  entityName: string,
  entityId: string | number,
) => {
  return request({ method: 'GET', route: `/game/${entityName}/${entityId}` });
};

export const getGameSubEntityByEntityById = (
  entityName: string,
  entityId: string | number,
  subEntityName: string,
) => {
  return request({
    method: 'GET',
    route: `/game/${entityName}/${entityId}/${subEntityName}`,
  });
};
