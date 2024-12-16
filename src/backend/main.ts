import { prisma } from "@/database/init";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import { errorHandler } from "./handler/error.handler";
import { Logger } from "./handler/logger.handler";
import { routes } from "./routes/routes";

import { upload } from "./config/storage";
import { configApp } from "./config/config";

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(Logger); // Logging middleware
app.use(routes); // Routes middleware

app.post("/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    res.status(200).json({
      status: true,
      message: "File uploaded successfully",
      data: req.file,
    });
  } else {
    res.status(400).json({
      status: false,
      message: "File not uploaded",
    });
  }
});
app.use(errorHandler); // Error handling middleware

// Server startup
app.listen(configApp.port, async () => {
  try {
    await prisma.$connect();
    console.log(chalk.green("> Database connected"));
    console.log(chalk.green(`> Server started on port ${configApp.port}`));
  } catch (error) {
    console.error(
      chalk.red("Failed to connect to the database:"),
      chalk.red(error)
    ); // Red text for database connection failure
  }
});
