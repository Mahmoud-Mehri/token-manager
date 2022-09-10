import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { Server } from "./server";
import { Token } from "./token";
import { dbconnection } from "../db-connection";

class Deploy extends Model<
  InferAttributes<Deploy>,
  InferCreationAttributes<Deploy>
> {
  declare id: CreationOptional<number>;
  declare tokenId: ForeignKey<Token["id"]>;
  declare serverId: ForeignKey<Server["id"]>;
  declare address: string;
  declare status: string;
  declare optMintable: boolean;
  declare optBurnable: boolean;
  declare optPausable: boolean;
  declare deployAccountAddress: string;
  declare ownerAccountAddress: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Deploy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING(42),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PAUSED", "ACTIVE"),
      defaultValue: "CREATED",
      allowNull: false,
    },
    deployAccountAddress: {
      type: DataTypes.STRING(42),
    },
    ownerAccountAddress: {
      type: DataTypes.STRING(42),
    },
    optMintable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    optBurnable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    optPausable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: dbconnection,
    modelName: "deploy",
  }
);

export { Deploy };
