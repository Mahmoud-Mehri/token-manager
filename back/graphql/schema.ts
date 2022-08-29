import { buildSchema } from "graphql";
import fs from "fs";

const schemaString = fs.readFileSync("./schema.gql");
export const schema = buildSchema(`${schemaString}`);
