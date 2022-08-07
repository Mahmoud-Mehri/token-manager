import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import { dbconnection } from "../db-connection";

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
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("CREATED", "PAUSED", "ACTIVE"),
      defaultValue: "CREATED",
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
    },
    ownerAddress: {
      type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: dbconnection,
    modelName: "token",
  }
);

export { Token };
