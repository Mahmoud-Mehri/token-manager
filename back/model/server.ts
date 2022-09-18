import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { dbconnection } from "../db-connection";

class Server extends Model<
  InferAttributes<Server>,
  InferCreationAttributes<Server>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare providerUrl: string;
  declare isTest: boolean;
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
    isTest: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: dbconnection,
    modelName: "server",
  }
);

const syncTable = async () => {
  await Server.sync({ alter: true });
};
syncTable();

export { Server };
