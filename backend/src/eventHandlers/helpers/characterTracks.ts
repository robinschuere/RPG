import { getEntity } from '../../helpers/entityHelper';
import { stageTypes } from '../../../../shared/constants';
import {
  createChanceCounter,
  getRandomValueFromEntities,
  randomizer,
} from '../../../../shared/helpers/randomizer';
import sendCharacterStateThroughSocket from '../../helpers/sendMessage';
import { CharacterState } from '../../../../shared/types/CharacterState';
import { LocationResource } from '../../../../shared/types/LocationResource';
import { WebSocket } from 'ws';
import config from '../../../config';
import { LocationMonster } from '../../../../shared/types/LocationMonster';
import { v4 as uuid } from 'uuid';
import { EventHelperProps } from './types';

const locationResourceStore = getEntity('location_resources');
const characterStateStore = getEntity('character_states');
const locationMonsterStore = getEntity('location_monsters');
const monsterStore = getEntity('monsters');
const itemStore = getEntity('items');

const handleNothing = async (socket: WebSocket, state: CharacterState) => {
  await sendCharacterStateThroughSocket(socket, true, state.characterId);
  setTimeout(
    () => characterTracks({ socket: socket, characterId: state.characterId }),
    config.game.timeBetweenTracks,
  );
};

const handleEncounter = async (
  socket: WebSocket,
  state: CharacterState,
  resources: LocationResource[],
) => {
  const locationResource = getRandomValueFromEntities(
    resources,
  ) as LocationResource;

  console.debug(locationResource);

  const item = await itemStore.getById(locationResource.itemId);
  await characterStateStore.update(state.id, {
    stageType: stageTypes.TRACK_RESOURCE,
    stageValues: {
      drops: [{ tempId: uuid, item, amount: locationResource.amount }],
    },
  });
  await sendCharacterStateThroughSocket(socket, true, state.characterId);
  return;
};

const handleMonster = async (
  socket: WebSocket,
  state: CharacterState,
  locationMonsters: LocationMonster[],
) => {
  const locationMonster = getRandomValueFromEntities(
    locationMonsters,
  ) as LocationMonster;
  const monster = await monsterStore.getById(locationMonster.monsterId);
  await characterStateStore.update(state.id, {
    stageType: stageTypes.TRACK_COMBAT,
    stageValues: {
      locationMonster,
      monster,
    },
  });
  await sendCharacterStateThroughSocket(socket, true, state.characterId);
  return;
};

export const characterTracks = async ({
  socket,
  characterId,
}: EventHelperProps): Promise<void> => {
  const state: CharacterState = await characterStateStore
    .getTable()
    .where({ characterId })
    .first()
    .select();

  if (state.stageType !== stageTypes.TRACK) {
    // early stop whenever the track state was changed...
    return;
  }
  const resources = await locationResourceStore
    .getTable()
    .where({ locationId: state.locationId })
    .select();
  const monsters = await locationMonsterStore
    .getTable()
    .where({ locationId: state.locationId })
    .select();

  const values = [
    resources ? { id: 'RESOURCE' } : undefined,
    monsters ? { id: 'MONSTER' } : undefined,
    { id: 'NOTHING', chance: 10 },
  ]
    .filter(Boolean)
    .map(({ id, chance }, _index, arr) => {
      if (arr.length === 3) {
        return { id, chance: chance || 45 };
      }
      return { id, chance: chance || 90 };
    });

  const encounterChance = createChanceCounter(values);
  const random = randomizer(encounterChance);
  const type = encounterChance[random()];
  switch (type) {
    case 'ENCOUNTER':
      handleEncounter(socket, state, resources);
      break;
    case 'MONSTER':
      handleMonster(socket, state, monsters);
      break;
    default:
      handleNothing(socket, state);
      break;
  }
};
