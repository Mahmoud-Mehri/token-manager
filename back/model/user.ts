import bcrypt from "bcrypt";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import { Token } from "./token";
import { Account } from "./account";
import { dbconnection } from "../db-connection";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  async validatePassword(pass: string) {
    return await bcrypt.compare(pass, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      unique: {
        name: "email",
        msg: "Email Address is already used",
      },
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email Address is not valid",
        },
      },
    },
    password: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: dbconnection,
    modelName: "user",
    hooks: {
      beforeCreate: async function (user, options) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

User.hasMany(Account, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "accounts",
});

User.hasMany(Token, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "tokens",
});

export { User };
