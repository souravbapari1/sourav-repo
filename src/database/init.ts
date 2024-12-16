import { PrismaClient } from "@prisma/client";

class DBClient {
  private prisma: PrismaClient;
  private static instance: DBClient;
  private isConnected: boolean = false;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  public static getInstance(): DBClient {
    if (!DBClient.instance) {
      console.log("--------- DBClient instance created ---------");
      DBClient.instance = new DBClient();
    }
    if (DBClient.instance.isConnected) {
      console.log("--------- DB Client already connected ---------");
    }
    return DBClient.instance;
  }

  public async connect(): Promise<PrismaClient> {
    if (!this.isConnected) {
      try {
        await this.prisma.$connect();
        this.isConnected = true;
        console.log("--------- Prisma Client connected ---------");
      } catch (error) {
        console.error("Error connecting to Prisma Client:", error);
        throw error;
      }
    } else {
      console.log("--------- Prisma Client already connected ---------");
    }
    return this.prisma;
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      try {
        await this.prisma.$disconnect();
        this.isConnected = false;
        console.log("--------- Prisma Client disconnected ---------");
      } catch (error) {
        console.error("Error disconnecting Prisma Client:", error);
        throw error;
      }
    } else {
      console.log("--------- Prisma Client was not connected ---------");
    }
  }

  public getClient(): PrismaClient {
    return this.prisma;
  }
}

// Exporting a singleton instance
export const prisma = DBClient.getInstance().getClient();
