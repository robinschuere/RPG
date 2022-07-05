import { WebSocket } from 'ws';
import { CharacterState } from '../../../shared/types/CharacterState';
import { Event } from '../../../shared/types/Event';

export interface EventHandlerProps {
  existingState: CharacterState;
  event: Event;
  socket: WebSocket;
}
