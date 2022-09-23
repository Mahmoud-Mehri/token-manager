import { Sequelize } from "sequelize";
import * as config from "./config.json";

const dbconnection = new Sequelize("token_manager", "postgres", "postgres", {
  dialect: "postgres",
  dialectOptions: {},
  logging: config.postgres.logging,
});

export { dbconnection };
