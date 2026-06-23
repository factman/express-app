"use strict";

import { DataTypes, Model, Sequelize } from "sequelize";
import { Book } from "./Book.model.js";

export class User extends Model {
  /**
   * @type {Sequelize}
   */
  static init(sequelize) {
    super.init(
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
        fullName: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${this.firstName} ${this.lastName}`;
          },
          /**
           * @param {string} value
           */
          set(value) {
            const [firstName, lastName] = value
              .split(" ", 2)
              .map((v) => v.trim());
            this.setDataValue("firstName", firstName);
            this.setDataValue("lastName", lastName);
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
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
        // bio: {
        //   type: DataTypes.TEXT,
        //   allowNull: true,
        // },
        lastLoginAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      { sequelize },
    );
  }

  static associate() {
    User.hasMany(Book);
  }
}
