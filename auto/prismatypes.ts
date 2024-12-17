import fs from "fs";
import path from "path";

interface Field {
  field: string;
  type: string;
  isRelation?: boolean;
  isEnum?: boolean;
  isArray?: boolean; // New property to detect array fields
  values?: string[]; // Enum values for inline inclusion
}

interface Relation {
  field: string;
  relatedModel: string;
}

interface Model {
  fields: Field[];
  relations: Relation[];
}

interface SchemaModels {
  [model: string]: Model;
}

interface EnumDefinition {
  [enumName: string]: string[];
}

interface Config {
  excludeFields?: string[]; // Fields to exclude like ["id", "createdAt"]
  inlineEnums?: boolean; // Whether to inline enum values
  outputFormat?: "pretty" | "compact"; // JSON output formatting
}

// Default configuration
const CONFIG: Config = {
  excludeFields: [], // Default exclusions
  inlineEnums: true, // Inline enum values by default
  outputFormat: "pretty", // Default output format
};

// Function to read and parse the Prisma schema
function parsePrismaSchema(): string {
  const prismaSchemaPath = path.join(__dirname, "../prisma/schema.prisma");
  const schemaContent = fs.readFileSync(prismaSchemaPath, "utf-8");
  return schemaContent;
}

// Helper to check if a type is a model
function isModelType(type: string, schema: string): boolean {
  const modelRegex = new RegExp(`model\\s+${type}\\s*{`);
  return modelRegex.test(schema);
}

// Helper to check if a type is an enum
function isEnumType(type: string, enums: EnumDefinition): boolean {
  return Object.keys(enums).includes(type);
}

// Function to extract all enum definitions
function extractEnums(schema: string): EnumDefinition {
  const enumRegex = /enum (\w+)\s*{([^}]*)}/g;
  const enums: EnumDefinition = {};

  let match: RegExpExecArray | null;
  while ((match = enumRegex.exec(schema)) !== null) {
    const enumName = match[1];
    const enumValues = match[2]
      .split("\n")
      .map((v) => v.trim())
      .filter((v) => v !== "");
    enums[enumName] = enumValues;
  }
  return enums;
}

// Function to extract models, fields, and relations
function parseModels(
  schema: string,
  enums: EnumDefinition,
  config: Config
): SchemaModels {
  const modelRegex = /model (\w+)\s*{([^}]*)}/g;
  const fieldRegex = /^\s*(\w+)\s+(\w+(\[\])?)/gm;

  const models: SchemaModels = {};

  let modelMatch: RegExpExecArray | null;
  while ((modelMatch = modelRegex.exec(schema)) !== null) {
    const modelName = modelMatch[1];
    const modelContent = modelMatch[2];
    const fields: Field[] = [];
    const relations: Relation[] = [];

    let fieldMatch: RegExpExecArray | null;
    while ((fieldMatch = fieldRegex.exec(modelContent)) !== null) {
      const fieldName = fieldMatch[1];
      const rawFieldType = fieldMatch[2];
      const isArray = rawFieldType.endsWith("[]"); // Check for array type
      const fieldType = rawFieldType.replace("[]", ""); // Remove [] for type

      // Skip fields based on config
      if (config.excludeFields && config.excludeFields.includes(fieldName))
        continue;

      // Determine if field is an enum
      if (isEnumType(fieldType, enums)) {
        const field: Field = {
          field: fieldName,
          type: "enum",
          isEnum: true,
          isArray, // Add isArray property
        };

        // Inline enum values if enabled
        if (config.inlineEnums) {
          field.values = enums[fieldType];
        }
        fields.push(field);
        continue;
      }

      // Check if the fieldType is a relation or a primitive
      if (isModelType(fieldType, schema)) {
        relations.push({
          field: fieldName,
          relatedModel: fieldType,
        });
        fields.push({
          field: fieldName,
          type: fieldType,
          isRelation: true,
          isArray, // Add isArray property
        });
      } else {
        fields.push({
          field: fieldName,
          type: fieldType,
          isArray, // Add isArray property
        });
      }
    }

    models[modelName] = { fields, relations };
  }

  return models;
}

// Main function to process the schema
function main(config: Config = CONFIG) {
  const schema = parsePrismaSchema();

  // Extract all enums first
  const enums = extractEnums(schema);

  // Parse models and fields, identifying enums and relations
  const models = parseModels(schema, enums, config);

  const output = {
    models,
    enums,
  };

  // Define output file path
  const outputPath = path.join(
    __dirname,
    "../src/logic/prisma/schema-output.json"
  );

  // Write the output to a file
  const outputJson =
    config.outputFormat === "pretty"
      ? JSON.stringify(output, null, 2)
      : JSON.stringify(output);

  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }

  fs.writeFileSync(outputPath, outputJson, "utf-8");
  console.log(`Output written to: ${outputPath}`);
}

main();
