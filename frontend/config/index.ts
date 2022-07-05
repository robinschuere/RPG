export default {
  apiUrl: import.meta.env.VITE_API_URL,
  webSocketUrl: import.meta.env.VITE_API_WS,
  localStorageTokenName: 'RPG_TOKEN',
  aliveCheck: 10000,
  retryTime: 30000,
};
