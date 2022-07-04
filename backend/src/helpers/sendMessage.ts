import WebSocket from 'ws';
import { getGameState } from './getGameState';

const sendCharacterStateThroughSocket = async (
  ws: WebSocket,
  openState: boolean,
  characterId?: string,
): Promise<void> => {
  if (characterId) {
    const state = await getGameState(characterId);
    ws.send(JSON.stringify({ open: openState, state }));
  } else {
    ws.send(JSON.stringify({ open: openState }));
  }
};

export default sendCharacterStateThroughSocket;
