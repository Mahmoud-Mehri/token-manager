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
import { Deploy } from "./deploy";

class Account extends Model<
  InferAttributes<Account>,
  InferCreationAttributes<Account>
> {
  declare id: CreationOptional<number>;
  declare title: string;
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
    title: {
      type: DataTypes.STRING(100),
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

Account.hasMany(Deploy, {
  foreignKey: "accountId",
  sourceKey: "id",
});

Deploy.belongsTo(Account, {
  foreignKey: "accountId",
  targetKey: "id",
});

export { Account };
