import express from 'express';

const adminTokenMiddleware = express();

adminTokenMiddleware.use(async (req, res, next) => {
  const { isAdmin } = req.headers;
  if (isAdmin === 'ADMIN') {
    next();
  } else {
    return res.status(401).send('FORBIDDEN');
  }
});

export default adminTokenMiddleware;
