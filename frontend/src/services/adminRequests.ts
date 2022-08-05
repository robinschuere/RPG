import { request } from './rpgApi';

export const getAdminEntities = (entityName: string) => {
  return request({ method: 'GET', route: `/admin/${entityName}` });
};

export const getAdminEntityById = (
  entityName: string,
  entityId: string | number,
) => {
  return request({ method: 'GET', route: `/admin/${entityName}/${entityId}` });
};

export const updateAdminEntity = (
  entityName: string,
  entityId: number,
  data: any,
) => {
  return request({
    method: 'PUT',
    route: `/admin/${entityName}/${entityId}`,
    data,
  });
};

export const addAdminEntity = (entityName: string, data: any) => {
  return request({
    method: 'POST',
    route: `/admin/${entityName}`,
    data,
  });
};

export const removeAdminEntity = (entityName: string, entityId: number) => {
  return request({
    method: 'DELETE',
    route: `/admin/${entityName}/${entityId}`,
  });
};

export const fetchResources = (resourceName: string) => async () => {
  const { data } = await getAdminEntities(resourceName);
  return data;
};

export const fetchResource =
  (resourceName: string) => async (resourceId: string | number) => {
    if (resourceId === NaN) {
      return {};
    }
    const { data } = await getAdminEntityById(resourceName, resourceId);
    return data;
  };
