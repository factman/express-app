import { sequelizeDB } from "../sequelize.js";
import { Book } from "./Book.model.js";
import { User } from "./User.model.js";

export * from "./User.model.js";
export * from "./Book.model.js";

Book.belongsTo(User);
User.hasMany(Book);

export async function initDB() {
  await sequelizeDB.sync();
}
