import { NewCharacterProps } from '../../../shared/types/Character';
import { request } from './rpgApi';

export const getCharacters = () => {
  return request({ method: 'GET', route: '/characters' });
};

export const createCharacter = (character: NewCharacterProps) => {
  return request({
    method: 'POST',
    route: '/me/characters',
    data: { character },
  });
};

export const getGameEntity = (entityName: string) => {
  return request({ method: 'GET', route: `/game/${entityName}` });
};
