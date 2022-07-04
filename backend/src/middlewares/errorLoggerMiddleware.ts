import express from 'express';

const errorLoggerMiddleware = express();

errorLoggerMiddleware.use((err, req, res, next) => {
  console.error('UNEXPECTED ERROR CAUGHT -- SENDING A 500');
  console.error(err.stack);
  next(err);
});

export default errorLoggerMiddleware;
