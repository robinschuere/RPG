import app from './app';
import config from '../config';
import websocket from './websocket';
import http from 'http';

const main = () => {
  return new Promise((_, reject) => {
    try {
      const port = config.app.port;

      const server = http.createServer(app);

      websocket(server);

      server.listen(port, () => {
        console.log(`RPG Server listening on port ${port}`);
      });
    } catch (ex) {
      reject();
    }
  });
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
