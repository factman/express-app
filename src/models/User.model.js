import { DataTypes, Model } from "sequelize";
import { sequelizeDB } from "../sequelize.js";
import { Book } from "./Book.model.js";

export class User extends Model {
  get fullname() {
    return `${this.firstName} ${this.lastName}`;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
      get() {
        /**
         * @type {string | null}
         */
        const rawValue = this.getDataValue("email");
        return rawValue ? decodeURIComponent(rawValue) : null;
      },
      /**
       * @param {string} value
       */
      set(value) {
        this.setDataValue("email", encodeURIComponent(value));
      },
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "author", "reader"),
      defaultValue: "reader",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize: sequelizeDB },
);
