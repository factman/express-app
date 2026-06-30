import { RequestHandler } from "express";
import { UserService } from "../services/User.service.js";
import { successResponse } from "../helpers/response.js";
import { AppError } from "../helpers/errorHandlers.js";
import { createHash } from "node:crypto";

export class UsersController {
  /**
   * @type {UserService}
   */
  userService;

  /**
   * @param {UserService} userService
   */
  constructor(userService) {
    this.userService = userService;
  }

  /**
   * @type {RequestHandler}
   */
  async getAllBooks(req, res) {
    const users = await this.userService.getUsers();
    successResponse(res, users, "Users retrieved successfully");
  }

  /**
   * @type {RequestHandler}
   */
  async getUserById(req, res) {
    const userId = req.params.id;
    if (userId && typeof userId === "string") {
      const user = await this.userService.getUser(userId);
      successResponse(res, user, "User retrieved successfully");
    }

    throw new AppError(400, "parameter `id` is missing");
  }

  /**
   * @type {RequestHandler}
   */
  async createUser(req, res) {
    const { firstName, lastName, email, password } = req.body;
    if (firstName && lastName && email && password) {
      if (password.length >= 6) {
        const hash = createHash("sha256").update(password).digest("hex");
        const user = await this.userService.createUser({
          email,
          firstName,
          lastName,
          passwordHash: hash,
        });

        successResponse(res, user, "User created successfully", 201);
      }

      throw new AppError(400, "`password` too short, require >= 6 characters");
    }

    throw new AppError(400, "Invalid parameters");
  }

  /**
   * @type {RequestHandler}
   */
  async updateUser(req, res) {
    const updateData = req.body;
    const userId = req.params.id;
    if (
      (updateData.firstName || updateData.lastName) &&
      userId &&
      typeof userId === "string"
    ) {
      const user = await this.userService.updateUser(userId, updateData);
      successResponse(res, user, "User updated successfully");
    }

    throw new AppError(400, "Request body can't be empty");
  }

  /**
   * @type {RequestHandler}
   */
  async deleteUser(req, res) {
    const userId = req.params.id;
    if (userId && typeof userId === "string") {
      const user = await this.userService.deleteUser(userId);
      successResponse(res, user, "User deleted successfully");
    }

    throw new AppError(400, "parameter `id` is missing");
  }
}
