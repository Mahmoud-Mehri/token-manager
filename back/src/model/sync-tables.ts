import { Account } from "./account";
import { Deploy } from "./deploy";
import { Server } from "./server";
import { Token } from "./token";
import { User } from "./user";

import config from "../config";

export async function syncTables() {
  await User.sync({ force: config.postgres.forceCreate });
  await Account.sync({ force: config.postgres.forceCreate });
  await Server.sync({ force: config.postgres.forceCreate });
  await Token.sync({ force: config.postgres.forceCreate });
  await Deploy.sync({ force: config.postgres.forceCreate });
}
