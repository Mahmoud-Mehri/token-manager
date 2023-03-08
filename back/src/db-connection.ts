import { Sequelize } from "sequelize";
import * as redis from "redis";
import config from "./config";

const sqlConnection = new Sequelize("token_manager", "postgres", "postgres", {
  dialect: "postgres",
  host: config.postgres.host,
  port: config.postgres.port,
  logging: config.postgres.logging,
});

const redisClient = redis.createClient({
  legacyMode: true,
  socket: {
    host: config.redis.host,
    port: config.redis.port,
  },
});

export { sqlConnection, redisClient };
