import { buildSchema } from "graphql";
import fs from "fs";

const schemaString = fs.readFileSync("./schema.gql");
const schema = buildSchema(`${schemaString}`);

export default schema;
