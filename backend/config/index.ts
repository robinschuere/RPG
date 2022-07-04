import 'dotenv/config';

export default {
  app: {
    port: process.env.PORT,
    secret: process.env.SECRET,
    appUrl: process.env.APP_URL,
    tokenTtl: parseInt(process.env.TOKEN_TTL, 10),
    withVerification: process.env.SHOULD_VERIFY === 'true',
    forgetExpiration: parseInt(process.env.FORGET_EXPIRATION, 10),
    mailUsername: process.env.MAIL_USERNAME,
    mailPassword: process.env.MAIL_PASSWORD,
  },
  postgres: {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT, 10),
  },
  game: {
    levelStart: parseInt(process.env.LEVEL_START, 10) || 15,
    levelRaise: parseInt(process.env.LEVEL_RAISE, 10) || 5,
    maxAmountOfCharacters: parseInt(process.env.MAX_AMOUNT_CHARACTERS, 10) || 1,
    timeBetweenTracks: parseInt(process.env.TRACK_TIME_OUT, 10) || 1000,
    timeBetweenRounds: parseInt(process.env.COMBAT_TIME_OUT, 10) || 3000,
    startLocationId: parseInt(process.env.START_LOCATION_ID, 10) || 1,
  },
};
