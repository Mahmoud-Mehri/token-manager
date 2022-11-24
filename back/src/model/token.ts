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
import { sqlConnection } from "../db-connection";
import { Account } from "./account";
import { TokenType } from "./general";

class Token extends Model<
  InferAttributes<Token>,
  InferCreationAttributes<Token>
> {
  declare id: CreationOptional<number>;
  declare type: number;
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
    type: {
      type: DataTypes.SMALLINT,
      defaultValue: TokenType.FT,
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
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sqlConnection,
    modelName: "token",
  }
);

Token.hasMany(Deploy, {
  sourceKey: "id",
  foreignKey: "tokenId",
});

Deploy.belongsTo(Token, {
  foreignKey: "tokenId",
  targetKey: "id",
});

export { Token };
