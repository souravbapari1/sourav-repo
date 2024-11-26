// @ts-check
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Read the directory containing all Prisma schema files
const prismaDir = path.join(__dirname, "prisma");
const schemaFiles = fs
  .readdirSync(prismaDir)
  .filter((file) => file.endsWith(".prisma"));

// Initialize statistics
let modelsUpdated = 0;
let createdAtAdded = 0;
let updatedAtAdded = 0;

// Regex to match model definitions
const modelRegex = /model\s+(\w+)\s*{([^}]+)}/g;

// Function to add missing timestamp fields to each model
function addTimestampsToModels(schema) {
  return schema.replace(modelRegex, (match, modelName, modelBody) => {
    let newModelBody = modelBody.trim();
    let modelModified = false;

    // Check if 'createdAt' is missing
    const hasCreatedAt = modelBody.includes("createdAt");
    // Check if 'updatedAt' is missing
    const hasUpdatedAt = modelBody.includes("updatedAt");

    if (!hasCreatedAt && !hasUpdatedAt) {
      // Add both if neither field exists, maintaining proper indentation and format
      newModelBody += `

  createdAt DateTime @default(now()) 
  updatedAt DateTime @updatedAt
`;
      createdAtAdded++;
      updatedAtAdded++;
      modelModified = true;
    } else if (!hasCreatedAt) {
      // Add 'createdAt' if only it is missing, maintaining proper indentation and format
      newModelBody += `
  createdAt DateTime @default(now())
`;
      createdAtAdded++;
      modelModified = true;
    } else if (!hasUpdatedAt) {
      // Add 'updatedAt' if only it is missing, maintaining proper indentation and format
      newModelBody += `
  updatedAt DateTime @updatedAt
`;
      updatedAtAdded++;
      modelModified = true;
    }

    if (modelModified) {
      modelsUpdated++;
      console.log(`Updated model: ${modelName}`);
    }

    // Return updated model body with proper indentation
    return `model ${modelName} {\n${newModelBody}\n}`;
  });
}

// Function to update schema files with timestamps
function updateSchemaWithTimestamps() {
  schemaFiles.forEach((file) => {
    const schemaPath = path.join(prismaDir, file);
    let schemaContent = fs.readFileSync(schemaPath, "utf8");

    // Apply timestamp updates
    const updatedSchema = addTimestampsToModels(schemaContent);

    // Only write back if the schema was updated
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

// Execute the update function
updateSchemaWithTimestamps();

console.log("Executing prisma formatting...");
exec("npx prisma format", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing prisma generate: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error executing prisma generate: ${stderr}`);
    return;
  }
  console.log(stdout);
});

console.log("Executing prisma validate...");

//validate
exec("npx prisma validate", (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing prisma validate: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error executing prisma validate: ${stderr}`);
    return;
  }
  console.log(stdout);
});
