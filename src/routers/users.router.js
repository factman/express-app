import express from "express";
import { UsersController } from "../controllers/Users.controller.js";
import { UserService } from "../services/User.service.js";

const { Router } = express;

export const usersRouter = Router();

const userService = new UserService();
const controller = new UsersController(userService);

usersRouter.get("/users", controller.getAllUsers);
usersRouter.get("/users/:id", controller.getUserById);
usersRouter.post("/users", controller.createUser);
usersRouter.put("/users/:id", controller.updateUser);
usersRouter.delete("/users/:id", controller.deleteUser);
