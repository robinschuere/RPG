import { getEntity } from '../helpers/entityHelper';
import { EventHandlerProps } from './types';

const eventEntities = getEntity('events');
const archivedEventEntities = getEntity('archived_events');

export const logoutCharacter = async ({ event }: EventHandlerProps) => {
  const { characterId } = event;
  const events = await eventEntities.getTable().where({ characterId }).select();

  await archivedEventEntities
    .getTable()
    .insert(events.map((e) => ({ ...e, archivedAt: new Date() })));

  await eventEntities.getTable().where({ characterId }).delete();

  return;
};
