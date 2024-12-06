import { PrismaClient } from "@prisma/client";

class DBClient {
  public prisma: PrismaClient;
  private static instance: DBClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance = () => {
    if (!DBClient.instance) {
      console.log("DBClient instance created");
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  };
}

export const prisma = DBClient.getInstance().prisma;
