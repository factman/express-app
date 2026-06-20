import { Sequelize } from "sequelize";
import path from "node:path";

export const sequelizeDB = new Sequelize({
  dialect: "sqlite",
  storage: path.join(import.meta.dirname, "../database/db.sqlite"),
  benchmark: true,
});
