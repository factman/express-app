import express from "express";
import {
  appErrorHandler,
  notFoundErrorHandler,
} from "./src/helpers/errorHandlers.js";
import { initDB } from "./src/models/index.js";

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
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: {},
    message: "Welcome to express app",
  });
});

// Error handling
app.use(notFoundErrorHandler);
app.use(appErrorHandler);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
