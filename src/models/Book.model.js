import { DataTypes, Model } from "sequelize";
import { sequelizeDB } from "../sequelize.js";
import { User } from "./User.model.js";

export class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pageCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
      validate: { min: 0 },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { min: 0 },
    },
  },
  { sequelize: sequelizeDB },
);
