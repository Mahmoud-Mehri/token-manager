import express, { json, urlencoded } from 'express';
import cookieparser from 'cookie-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import * as redis from 'redis';
import * as config from './config.json';

// Routes
import { userRouter } from './api/routes/user-routes';
import { tokenRouter } from './api/routes/token-routes';

// Middlewares
import { authenticator } from './api/middleware/authenticator';

const redisClient = redis.createClient({ legacyMode: true });
const redisStore = connectRedis(session);

const app = express();

app.use(session({
    secret: config.auth.sessionSecret,
    store: new redisStore({
        host: config.redis.host,
        port: config.redis.port,
        client: redisClient
    }),
    cookie: {
        httpOnly: true,
        maxAge: 1 * 60 * 60 * 1000,
        sameSite: "lax"
    },
    resave: false,
    saveUninitialized: false,
}));
app.use(cookieparser());
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/users/', authenticator);
app.use('/users/', userRouter);

app.use('/tokens/', authenticator);
app.use('/tokens/', tokenRouter);

export { app }





