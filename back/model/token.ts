import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { User } from "./user";
import { Deploy } from "./deploy";
import { dbconnection } from "../db-connection";
import { Account } from "./account";

class Token extends Model<
  InferAttributes<Token>,
  InferCreationAttributes<Token>
> {
  declare id: CreationOptional<number>;
  declare tokenType: string;
  declare title: string;
  declare name: string;
  declare symbol: string;
  declare description: string;
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
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: dbconnection,
    modelName: "token",
  }
);

Token.hasMany(Deploy, {
  sourceKey: "id",
  foreignKey: "tokenId",
  as: "deploys",
});
// Token.belongsTo(User, { targetKey: "id" });

export { Token };
