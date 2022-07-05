import { Character } from '../../../shared/types/Character';
import { CharacterState } from '../../../shared/types/CharacterState';
import { Location } from '../../../shared/types/Location';
import { LocationShop } from '../../../shared/types/LocationShop';
import { Profession } from '../../../shared/types/Profession';
import { Race } from '../../../shared/types/Race';
import { Gender } from '../../../shared/types/Gender';
import { getEntity } from './entityHelper';
import { defineNextLevelExperience } from './raiseHelpers';

const characterStore = getEntity('characters');
const locationStore = getEntity('locations');
const locationShopStore = getEntity('location_shops');
const locationMonsterStore = getEntity('location_monsters');
const characterStateStore = getEntity('character_states');
const raceStore = getEntity('races');
const genderStore = getEntity('genders');
const professionStore = getEntity('professions');

const getCharacterState = async (characterId: string) => {
  const currentState = await characterStateStore
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
  const character: Character = await characterStore.getById(characterId);
  const location: Location = await locationStore.getById(
    characterState.locationId,
  );
  const locationMonsters = await locationMonsterStore
    .getTable()
    .where({ locationId: characterState.locationId })
    .count();
  const shops: LocationShop[] = await locationShopStore
    .getTable()
    .where({ locationId: characterState.locationId })
    .select();
  const gender: Gender = await genderStore.getById(character.genderId);
  const race: Race = await raceStore.getById(character.raceId);
  const professions: Profession[] = await Promise.all(
    character.professionIds.map((professionId) =>
      professionStore.getById(professionId),
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
    hasMonsters: locationMonsters > 0,
    shops,
  };
  return gameState;
};
