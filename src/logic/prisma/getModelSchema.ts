import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to get model fields dynamically
async function getModelFields(
  modelName: string
): Promise<{ field: string; type: string }[] | null> {
  // Check if the model exists in Prisma Client
  const model = prisma[modelName as keyof PrismaClient];
  if (!model) {
    console.log("Model not found");
    return null;
  }

  // Retrieve metadata dynamically using Prisma's introspection features
  const modelData: any = await prisma.$queryRaw`DESCRIBE ${modelName}`;

  // Process the raw query result to return field names and their types
  return modelData.map((field: { Field: string; Type: string }) => ({
    field: field.Field,
    type: field.Type,
  }));
}

// Example Usage
async function run() {
  const userFields = await getModelFields("User");
  if (userFields) {
    console.log(userFields);
  } else {
    console.log("Model not found or an error occurred");
  }
}

run();
