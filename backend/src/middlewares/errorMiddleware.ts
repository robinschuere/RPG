import express from 'express';

const errorMiddleware = express();

errorMiddleware.use((err, req, res, _next) => {
  return res.status(500);
});

export default errorMiddleware;
