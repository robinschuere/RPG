import { Character } from '../../../shared/types/Character';
import { CharacterState } from '../../../shared/types/CharacterState';
import { Location } from '../../../shared/types/Location';
import { LocationShop } from '../../../shared/types/LocationShop';
import { Profession } from '../../../shared/types/Profession';
import { Race } from '../../../shared/types/Race';
import { Gender } from '../../../shared/types/Gender';
import { stores } from './entityHelper';
import { defineNextLevelExperience } from './raiseHelpers';

const getCharacterState = async (characterId: string) => {
  const currentState = await stores.characterStateStore
    .getTable()
    .where({ characterId })
    .first()
    .select();
  return currentState;
};

/**
 * gets the values that are necessary for the frontend to work with
 * @param characterId the id of the character in which we want to receive the valid information
 * @returns CharacterState
 */
export const getGameState = async (
  characterId: string,
): Promise<CharacterState> => {
  const characterState: CharacterState = await getCharacterState(characterId);
  const character: Character = await stores.characterStore.getById(characterId);
  const location: Location = await stores.locationStore.getById(
    characterState.locationId,
  );
  const locationMonsters = await stores.locationMonsterStore
    .getTable()
    .where({ locationId: characterState.locationId })
    .count()
    .first()
    .select();
  const shops: LocationShop[] = await stores.locationShopStore
    .getTable()
    .where({ locationId: characterState.locationId })
    .select();
  const gender: Gender = await stores.genderStore.getById(character.genderId);
  const race: Race = await stores.raceStore.getById(character.raceId);
  const professions: Profession[] = await Promise.all(
    character.professionIds.map((professionId) =>
      stores.professionStore.getById(professionId),
    ),
  );

  const gameState: CharacterState = {
    ...characterState,
    character: {
      ...character,
      race,
      gender,
      professions,
    },
    location,
    nextLevelExperience: defineNextLevelExperience(character.level),
    hasMonsters: locationMonsters.count > 0,
    shops,
  };
  return gameState;
};
