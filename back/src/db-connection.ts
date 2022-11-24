import { Sequelize } from "sequelize";
import * as config from "./config.json";

const sqlConnection = new Sequelize("token_manager", "postgres", "postgres", {
  dialect: "postgres",
  host: config.postgres.host,
  port: config.postgres.port,
  logging: config.postgres.logging,
});

export { sqlConnection };
