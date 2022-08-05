import { request } from './rpgApi';

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

export const getAmountToCreate = () => {
  return request({ method: 'GET', route: '/me/characters' });
};

export const updateMe = (data: any) => {
  return request({ method: 'POST', route: '/me', data });
};
