import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { User } from "./user";
import { dbconnection } from "../db-connection";
import { Account } from "./account";

class Token extends Model<
  InferAttributes<Token>,
  InferCreationAttributes<Token>
> {
  declare id: CreationOptional<number>;
  declare tokenType: string;
  declare title: string;
  declare status: string;
  declare address: string;
  declare createDate: Date;
  declare deployDate: Date;
  declare activeDate: Date;
  declare creatorAddress: string;
  declare ownerAddress: string;
  declare userId: ForeignKey<User["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tokenType: {
      type: DataTypes.ENUM("FT", "NFT"),
      defaultValue: "FT",
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("CREATED", "PAUSED", "ACTIVE"),
      defaultValue: "CREATED",
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(42),
      allowNull: false,
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deployDate: {
      type: DataTypes.DATE,
    },
    activeDate: {
      type: DataTypes.DATE,
    },
    creatorAddress: {
      type: DataTypes.STRING(42),
    },
    ownerAddress: {
      type: DataTypes.STRING(42),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: dbconnection,
    modelName: "token",
  }
);

// Token.belongsTo(User, { targetKey: "id" });

export { Token };
