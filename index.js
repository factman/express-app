import express from "express";
import {
  appErrorHandler,
  notFoundErrorHandler,
} from "./src/helpers/errorHandlers.js";
import { initDB } from "./src/sequelize.js";
import { UserService } from "./src/services/User.service.js";
import { BookService } from "./src/services/Book.service.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Database
initDB()
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((reason) => {
    console.error(`Database connection error:`, reason);
  });

// Routers init
app.get("/", async (req, res) => {
  res.status(200).json({
    success: true,
    data: await new UserService().getUsers(),
    message: "Welcome to express app",
  });
});

app.get("/books", async (req, res) => {
  res.status(200).json({
    success: true,
    data: await new BookService().getUsers(),
    message: "Welcome to The Books Page",
  });
});

// Error handling
app.use(notFoundErrorHandler);
app.use(appErrorHandler);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
