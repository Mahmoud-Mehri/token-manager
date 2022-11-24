import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
  NonAttribute,
} from "sequelize";
import { Server } from "./server";
import { Token } from "./token";
import { sqlConnection } from "../db-connection";
import { TokenDeployStatus } from "./general";
import { Account } from "./account";

class Deploy extends Model<
  InferAttributes<Deploy>,
  InferCreationAttributes<Deploy>
> {
  declare id: CreationOptional<number>;
  declare tokenId: ForeignKey<Token["id"]>;
  declare serverId: ForeignKey<Server["id"]>;
  declare accountId: ForeignKey<Account["id"]>;
  declare address: string;
  declare status: number;
  declare optMintable: boolean;
  declare optBurnable: boolean;
  declare optPausable: boolean;
  declare deployAccountAddress: string;
  declare ownerAccountAddress: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare token: NonAttribute<Token>;
  declare server: NonAttribute<Server>;
  declare account: NonAttribute<Account>;
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
      type: DataTypes.SMALLINT,
      defaultValue: TokenDeployStatus.ACTIVE,
      allowNull: false,
      get() {
        const value = this.getDataValue("status");
        switch (value) {
          case TokenDeployStatus.ACTIVE:
            return "ACTIVE";
          case TokenDeployStatus.PAUSED:
            return "PAUSED";
          default:
            return "UNKNOWN";
        }
      },
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
    tokenId: DataTypes.INTEGER,
    serverId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sqlConnection,
    modelName: "deploy",
  }
);

export { Deploy };
