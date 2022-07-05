import config from '../../config';
import { getEntity } from '../helpers/entityHelper';

const characterEntities = getEntity('characters');

const getByUserId = (userId) =>
  characterEntities.getTable().where({ userId }).select();

const getByUserIdAndCharacterId = (userId, id) =>
  characterEntities.getTable().where({ userId, id }).first().select();

export const getAll = async (req, res, _next) => {
  const { userId } = req.headers;
  const result = await getByUserId(userId);
  return res.json(result);
};

export const add = async (req, res, _next) => {
  const { userId } = req.headers;
  const { data } = req.body;
  const existingCharacters = await getByUserId(userId);
  if (existingCharacters.length > config.game.maxAmountOfCharacters) {
    return res.status(400).json({
      message: `Max amount of characters reached (${config.game.maxAmountOfCharacters})`,
    });
  }
  await characterEntities.insert(data);
  const newCharacters = await getByUserId(userId);
  return res.json({ characters: newCharacters });
};

export const remove = async (req, res, _next) => {
  const { userId } = req.headers;
  const { characterId } = req.params;
  const exists = await getByUserIdAndCharacterId(userId, characterId);
  if (!exists) {
    return res.status(400).json({
      message: `This is not your character!`,
    });
  }
  const removed = await characterEntities.remove(characterId);
  return res.json(removed);
};

export const getById = async (req, res, _next) => {
  const { userId } = req.headers;
  const { characterId } = req.params;
  const userCharacter = await getByUserIdAndCharacterId(userId, characterId);
  if (!userCharacter) {
    return res.status(404).json({
      message: `This character does not exist`,
    });
  }
  return userCharacter;
};
