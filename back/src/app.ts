import express, { json, urlencoded } from "express";
import cookieparser from "cookie-parser";
import session from "express-session";
import connectRedis from "connect-redis";
import * as redis from "redis";
import cors from "cors";
import helmet from "helmet";
import RateLimit from "express-rate-limit";
import config from "./config";
import { syncTables } from "./model/sync-tables";
import { redisClient } from "./db-connection";

// Routes
import { authRouter } from "./routes/auth-routes";
import { serverRouter } from "./routes/server-routes";
import { userRouter } from "./routes/user-routes";
import { tokenRouter } from "./routes/token-routes";
import { accountRouter } from "./routes/account-routes";
import { deployRouter } from "./routes/deploy-routes";

// Middlewares
import { authenticator } from "./middleware/authenticator";
import { handle404 } from "./middleware/error-handler";

console.log("Before Syncing Tables");

syncTables();

console.log("After Syncing Tables");

const redisStore = connectRedis(session);

(async function () {
  await redisClient.connect();
})();

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieparser());
app.use(
  session({
    secret: config.auth.sessionSecret,
    store: new redisStore({
      host: config.redis.host,
      port: config.redis.port,
      client: redisClient as any,
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1 * 60 * 60 * 1000,
      sameSite: "lax",
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);
app.use(helmet());

const rateLimit = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(rateLimit);

app.use("/", authRouter);

app.use("/servers", authenticator);
app.use("/servers", serverRouter);

app.use("/users", authenticator);
app.use("/users", userRouter);

app.use("/tokens", authenticator);
app.use("/tokens", tokenRouter);

app.use("/accounts", authenticator);
app.use("/accounts", accountRouter);

app.use("/deploys", authenticator);
app.use("/deploys", deployRouter);

app.use(handle404);

export { app };
