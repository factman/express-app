"use strict";

import { Sequelize } from "sequelize";
import path from "node:path";
import { User } from "./models/User.model.js";
import { Book } from "./models/Book.model.js";

export const sequelizeDB = new Sequelize({
  dialect: "sqlite",
  storage: path.join(import.meta.dirname, "../database/db.sqlite"),
  benchmark: true,
});

export const models = {
  User,
  Book,
};

Object.values(models)
  .map((model) => {
    model.init(sequelizeDB);
    return model;
  })
  .forEach((model) => {
    model.associate();
  });

export async function initDB() {
  await sequelizeDB.sync();
}
