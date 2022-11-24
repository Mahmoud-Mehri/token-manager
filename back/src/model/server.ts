import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { sqlConnection } from "../db-connection";
import { Deploy } from "./deploy";
import { ServerType } from "./general";

class Server extends Model<
  InferAttributes<Server>,
  InferCreationAttributes<Server>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare providerUrl: string;
  declare serverType: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Server.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    providerUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    serverType: {
      type: DataTypes.SMALLINT,
      defaultValue: ServerType.LOCAL,
      get() {
        const value = this.getDataValue("serverType");
        switch (value) {
          case ServerType.MAINNET:
            return "MAINNET";
          case ServerType.TESTNET:
            return "TESTNET";
          case ServerType.LOCAL:
            return "LOCAL";
          default:
            return "UNKNOWN";
        }
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sqlConnection,
    modelName: "server",
  }
);

Server.hasMany(Deploy, {
  foreignKey: "serverId",
  sourceKey: "id",
});

Deploy.belongsTo(Server, {
  foreignKey: "serverId",
  targetKey: "id",
});

export { Server };
