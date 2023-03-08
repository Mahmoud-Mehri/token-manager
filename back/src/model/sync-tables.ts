import { Account } from "./account";
import { Deploy } from "./deploy";
import { Server } from "./server";
import { Token } from "./token";
import { User } from "./user";

export async function syncTables() {
  await User.sync({ force: true });
  await Account.sync({ force: true });
  await Server.sync({ force: true });
  await Token.sync({ force: true });
  await Deploy.sync({ force: true });
}
