import WebSocket from 'ws';
import eventHandlers from '../../eventHandlers';
import { Event } from '../../../../shared/types/Event';
import { getEntity } from '../../helpers/entityHelper';
import { EventHandlerProps } from 'src/eventHandlers/types';

const characterStateEntity = getEntity('character_states');
const eventEntity = getEntity('events');

const getCharacterState = async (characterId: string) => {
  const currentState = await characterStateEntity
    .getTable()
    .where({ characterId })
    .first()
    .select();
  return currentState;
};

export const handleEvent = async (
  event: Event,
  socket: WebSocket,
): Promise<void> => {
  // create a new event
  const [newEvent] = await eventEntity.insert(event);

  // check if the eventType handler exists
  const handler = eventHandlers[newEvent.eventType];

  if (handler) {
    // get the existing state (we are going to use it almost everywhere)
    const existingState = await getCharacterState(event.characterId);
    const eventProps: EventHandlerProps = {
      existingState,
      event: newEvent,
      socket,
    };
    await handler(eventProps);
  } else {
    console.error(`The handler for event ${event.eventType} does not exist!`);
  }
};
