import express from 'express';

const loggerMiddleware = express();

loggerMiddleware.use((req, _, next) => {
  console.log(req.method.padEnd(6, ' '), req.originalUrl);
  next();
});

export default loggerMiddleware;
