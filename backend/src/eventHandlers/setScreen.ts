import { getEntity } from '../helpers/entityHelper';
import { EventHandlerProps } from './types';

const characterStateEntities = getEntity('character_states');

export const setScreen = async ({
  existingState,
  event,
}: EventHandlerProps) => {
  if (!existingState) {
    return;
  }
  console.debug('UPDATE SCREENTYPE TO', event.values.screenType);
  await characterStateEntities.update(existingState.id, {
    screenType: event.values.screenType,
  });

  return;
};
