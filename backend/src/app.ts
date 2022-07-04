import bodyParser from 'body-parser';
import express from 'express';
import {
  alive,
  forget,
  getUser,
  login,
  logout,
  register,
  remember,
  resendVerification,
  updateUser,
  verify,
} from './controllers/users';
import characterRoute from './routes/characters';
import adminRoutes from './routes/adminRoutes';
import gameRoutes from './routes/gameRoutes';
import loggerMiddleware from './middlewares/loggerMiddleware';
import clientErrorMiddleware from './middlewares/clientErrorMiddleware';
import errorLoggerMiddleware from './middlewares/errorLoggerMiddleware';
import errorMiddleware from './middlewares/errorMiddleware';
import cors from 'cors';
import tokenMiddleware from './middlewares/tokenMiddleware';
import adminTokenMiddleware from './middlewares/adminTokenMiddleware';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerMiddleware);

app.use(cors());

app.post('/login', login);
app.post('/register', register);
app.post('/verify', verify);
app.post('/forget', forget);
app.post('/remember', remember);

app.use(tokenMiddleware);
app.get('/resendverification', resendVerification);
app.get('/alive', alive);
app.get('/logout', logout);
app.get('/me', getUser);
app.post('/me', updateUser);
app.use('/characters', characterRoute);
app.use('/game', gameRoutes);

app.use('/admin', adminTokenMiddleware, adminRoutes);

app.use('/*', (req, res, _next) => {
  return res.status(404).send('NOT FOUND');
});

app.use(errorLoggerMiddleware);
app.use(clientErrorMiddleware);
app.use(errorMiddleware);

export default app;
