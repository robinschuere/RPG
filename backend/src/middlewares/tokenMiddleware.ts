import express from 'express';
import { checkToken } from '../helpers/encryptionHelper';

const tokenMiddleware = express();

tokenMiddleware.use(async (req, res, next) => {
  const { authorization } = req.headers;
  const { verified, ...rest } = await checkToken(authorization);
  if (verified) {
    req.headers.userId = rest.userId;
    req.headers.email = rest.email;
    if (rest.isAdmin) {
      req.headers.isAdmin = 'ADMIN';
    }
    next();
  } else {
    return res.status(401).send('FORBIDDEN');
  }
});

export default tokenMiddleware;
