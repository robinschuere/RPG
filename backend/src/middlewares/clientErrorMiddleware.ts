import express from 'express';

const clientErrorMiddleware = express();

clientErrorMiddleware.use(async (err, req, res, next) => {
  if (req.xhr) {
    return res.status(500).send('UNEXPECTED ERROR');
  } else {
    next(err);
  }
});

export default clientErrorMiddleware;
