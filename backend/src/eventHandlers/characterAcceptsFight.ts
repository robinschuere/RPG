import { getEntity } from '../helpers/entityHelper';
import config from '../../config';
import { combatTypes, roundTypes, stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import {
  defineCharacterStatistics,
  defineMonsterStatistics,
  defineRound,
} from '../helpers/combatHelper';
import {
  CharacterState,
  CombatStageValues,
  RoundHistory,
  RoundValue,
} from '../../../shared/types/CharacterState';
import { monsterAttack } from './helpers/monsterAttack';

const characterStateEntities = getEntity('character_states');

export const characterAcceptsFight = async ({
  existingState,
  socket,
}: EventHandlerProps) => {
  if (!existingState || existingState.stageType !== stageTypes.TRACK_COMBAT) {
    return;
  }

  const characterCombatState = await defineCharacterStatistics(existingState);
  const monsterCombatState = await defineMonsterStatistics(existingState);

  const round = defineRound(characterCombatState, monsterCombatState);
  const roundText: string =
    round === roundTypes.CHARACTER
      ? 'Due to the difference in speed, you may attack first.'
      : `${monsterCombatState.name} is looking at you and makes itself ready for the first strike.`;
  const roundValue: RoundValue = {
    type: combatTypes.START,
    amount: 0,
    deflection: 0,
  };
  const roundHistory: RoundHistory[] = [{ roundValue, roundText }];

  console.debug('UPDATING STAGETYPE TO COMBAT');
  const { locationMonster } = existingState.stageValues as CombatStageValues;
  const stageValues: CombatStageValues = {
    characterCombatState,
    monsterCombatState,
    round,
    roundBusy: false,
    roundValue,
    roundHistory,
    locationMonster,
    autoAttack: false,
  };
  const [newState]: [CharacterState] = await characterStateEntities.update(
    existingState.id,
    {
      stageType: stageTypes.COMBAT,
      stageValues,
    },
  );
  if (round === roundTypes.MONSTER) {
    setTimeout(
      () => monsterAttack({ socket, characterId: newState.characterId }),
      config.game.timeBetweenRounds,
    );
  }
};
