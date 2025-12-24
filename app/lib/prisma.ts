import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma__: PrismaClient | undefined;
}

export const prisma =
  global.__prisma__ ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn"] : ["warn"],
  });

if (process.env.NODE_ENV === "development") global.__prisma__ = prisma;
