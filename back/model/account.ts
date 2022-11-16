import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { User } from "./user";
import { sqlConnection } from "../db-connection";

class Account extends Model<
  InferAttributes<Account>,
  InferCreationAttributes<Account>
> {
  declare id: CreationOptional<number>;
  declare privateKey: string | null;
  declare address: string;
  declare userId: ForeignKey<User["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    privateKey: {
      type: DataTypes.STRING(66),
    },
    address: {
      type: DataTypes.STRING(42),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: sqlConnection,
    modelName: "account",
  }
);

// Account.belongsTo(User, { targetKey: "id" });

export { Account };
