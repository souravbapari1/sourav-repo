// @ts-check
import { exec } from "child_process";
import * as fs from "fs";
import * as path from "path";

// Define paths and types
const prismaDir: string = path.join(__dirname, "../prisma");

// Read all `.prisma` files in the "prisma" directory
const schemaFiles: string[] = fs
  .readdirSync(prismaDir)
  .filter((file: string) => file.endsWith(".prisma"));

// Initialize statistics
let modelsUpdated: number = 0;
let createdAtAdded: number = 0;
let updatedAtAdded: number = 0;

// Regex to match Prisma model definitions
const modelRegex: RegExp = /model\s+(\w+)\s*{([^}]+)}/g;

/**
 * Add missing `createdAt` and `updatedAt` fields to Prisma models.
 * @param {string} schema - The content of the schema file.
 * @returns {string} - Updated schema content with timestamp fields.
 */
function addTimestampsToModels(schema: string): string {
  return schema.replace(
    modelRegex,
    (match: string, modelName: string, modelBody: string): string => {
      let newModelBody: string = modelBody.trim();
      let modelModified: boolean = false;

      // Check if `createdAt` or `updatedAt` fields already exist
      const hasCreatedAt: boolean = modelBody.includes("createdAt");
      const hasUpdatedAt: boolean = modelBody.includes("updatedAt");

      // Add missing fields with proper formatting
      if (!hasCreatedAt && !hasUpdatedAt) {
        newModelBody += `

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
`;
        createdAtAdded++;
        updatedAtAdded++;
        modelModified = true;
      } else if (!hasCreatedAt) {
        newModelBody += `
  createdAt DateTime @default(now())
`;
        createdAtAdded++;
        modelModified = true;
      } else if (!hasUpdatedAt) {
        newModelBody += `
  updatedAt DateTime @updatedAt
`;
        updatedAtAdded++;
        modelModified = true;
      }

      // Log if a model was updated
      if (modelModified) {
        modelsUpdated++;
        console.log(`Updated model: ${modelName}`);
      }

      return `model ${modelName} {\n${newModelBody}\n}`;
    }
  );
}

/**
 * Update all Prisma schema files in the directory by adding timestamps.
 */
function updateSchemaWithTimestamps(): void {
  schemaFiles.forEach((file: string) => {
    const schemaPath: string = path.join(prismaDir, file);
    const schemaContent: string = fs.readFileSync(schemaPath, "utf8");

    const updatedSchema: string = addTimestampsToModels(schemaContent);

    // Write back to the file only if changes are made
    if (updatedSchema !== schemaContent) {
      fs.writeFileSync(schemaPath, updatedSchema, "utf8");
      console.log(`Updated schema file: ${file}`);
    }
  });

  // Print summary statistics
  console.log("Schema update completed:");
  console.log(`Total models updated: ${modelsUpdated}`);
  console.log(`'createdAt' fields added: ${createdAtAdded}`);
  console.log(`'updatedAt' fields added: ${updatedAtAdded}`);
}

// Run the schema update function
updateSchemaWithTimestamps();

/**
 * Execute a shell command and handle output.
 * @param {string} command - The shell command to execute.
 * @param {string} description - A description of the command.
 */
function executeCommand(command: string, description: string): void {
  console.log(`Executing ${description}...`);
  exec(command, (error: Error | null, stdout: string, stderr: string) => {
    if (error) {
      console.error(`Error executing ${description}: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error output while executing ${description}: ${stderr}`);
      return;
    }
    console.log(stdout);
  });
}

// Format the schema using `npx prisma format`
executeCommand("npx prisma format", "Prisma format");

// Validate the schema using `npx prisma validate`
executeCommand("npx prisma validate", "Prisma validate");
