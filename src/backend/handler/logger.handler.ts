import { Request, Response, NextFunction } from "express";
import chalk, { ChalkInstance } from "chalk";

export const Logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now(); // Capture request start time

  // Collect log content
  const logContent: string[] = [];

  // Request Information (Simple emojis with colors)
  logContent.push(chalk.blue(`🔵 [Incoming Request]`));
  logContent.push(chalk.gray(`🕒 ${new Date().toISOString()}`));
  logContent.push(chalk.green(`📬 Method: ${req.method}`)); // Green for method
  logContent.push(chalk.cyan(`🌍 Path: ${req.path}`)); // Cyan for path

  // Wait for response to log additional details
  res.on("finish", () => {
    const duration = Date.now() - start;

    // Determine color based on the response status code
    let statusColor: ChalkInstance;

    if (res.statusCode >= 200 && res.statusCode < 300) {
      statusColor = chalk.green; // Success (2xx)
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      statusColor = chalk.yellow; // Redirection (3xx)
    } else if (res.statusCode >= 400 && res.statusCode < 500) {
      statusColor = chalk.red; // Client Error (4xx)
    } else if (res.statusCode >= 500) {
      statusColor = chalk.magenta; // Server Error (5xx)
    } else {
      statusColor = chalk.white; // Default color if status code is unexpected
    }

    // Response Information (Simple emojis)
    logContent.push(""); // Blank line for separation
    logContent.push(chalk.yellow(`✅ [Response Sent]`));
    logContent.push(chalk.gray(`🕒 ${new Date().toISOString()}`));

    // Apply dynamic color to the status code
    logContent.push(statusColor(`🔴 Status Code: ${res.statusCode}`));

    logContent.push(chalk.cyan(`⏱️  Duration: ${duration}ms`)); // Cyan for duration

    // Add a final line at the end for separation
    logContent.push(chalk.gray("—".repeat(80))); // Simple line

    // Print the colorful log content
    console.log(logContent.join("\n"));
  });

  next();
};
