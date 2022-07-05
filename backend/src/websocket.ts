import WebSocket from 'ws';
import { Event } from '../../shared/types/Event';
import { handleEvent } from './controllers/game/events';
import { checkToken } from './helpers/encryptionHelper';
import sendCharacterStateThroughSocket from './helpers/sendMessage';

type SocketProps = {
  token: string;
  event: Event;
};

export default (server) => {
  const webSocketServer = new WebSocket.Server({ server });

  webSocketServer.on('connection', async (ws: WebSocket) => {
    //connection is up, let's add a simple simple event
    ws.on('message', async (message: string) => {
      console.log('received: %s', message);
      const data = JSON.parse(message);

      const { token, event } = data as SocketProps;

      if (token) {
        const { verified } = await checkToken(data.token);
        if (!verified) {
          ws.close();
          return;
        }
        if (event) {
          try {
            await handleEvent(event, ws);
            await sendCharacterStateThroughSocket(ws, true, event.characterId);
            return;
          } catch (e) {
            console.error(e);
            await sendCharacterStateThroughSocket(ws, true);
            return;
          }
        }
      }
    });
    ws.on('error', async () => {
      ws.send(JSON.stringify({ open: false }));
      ws.close();
    });
    ws.send(JSON.stringify({ open: true }));
  });
};
