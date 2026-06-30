"use strict";

import { AppError } from "../helpers/errorHandlers.js";
import { User } from "../models/User.model.js";

/**
 * @typedef {Object} UserData
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} passwordHash
 */

export class UserService {
  async getUsers() {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["passwordHash", "lastLoginAt"] },
        where: { isActive: true },
      });
      return users.map((user) => user.dataValues);
    } catch (err) {
      throw new AppError(500, "Something went wrong, try again.");
    }
  }

  /**
   * @param {string} id
   */
  async getUser(id) {
    try {
      const user = await User.findOne({
        attributes: { exclude: ["passwordHash", "lastLoginAt"] },
        where: { id },
      });
      if (!user) throw new AppError(404, "User not found");

      return user.dataValues;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(500, "Something went wrong, try again.");
    }
  }

  /**
   * @param {UserData} userParams
   */
  async createUser(userParams) {
    try {
      const user = await User.create({ ...userParams });
      return user.dataValues;
    } catch (err) {
      throw new AppError(400, "Invalid user parameters");
    }
  }

  /**
   * @param {string} id
   * @param {Partial<Pick<UserData, 'firstName' | 'lastName'>>} userParam
   */
  async updateUser(id, userParam) {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) throw new AppError(404, "User not found");

      const updatedUser = await user.update({ ...userParam });
      return updatedUser;
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(400, "Invalid user parameters");
    }
  }

  /**
   * @param {string} id
   */
  async deleteUser(id) {
    try {
      const user = await User.findOne({ where: { id } });
      if (!user) throw new AppError(404, "User not found");

      user.destroy();
      return "User deleted successfully";
    } catch (err) {
      if (err instanceof AppError) throw err;
      throw new AppError(500, "Something went wrong, try again.");
    }
  }
}
