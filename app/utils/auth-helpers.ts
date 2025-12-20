import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

type GlobalWithPrisma = typeof globalThis & { __prisma?: PrismaClient };
const g = globalThis as GlobalWithPrisma;

const base =
  g.__prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL!,
      },
    },
  });

if (process.env.NODE_ENV !== "production") g.__prisma = base;


export const prisma = base.$extends({
  query: {
    $allModels: {
      async $allOperations(params: any) {
        const { operation, model, args, query } = params;

        if (operation === "create" && (model === "Session" || model === "Account")) {
          const data: any = args?.data ?? {};

          if (model === "Session") {
            data.sessionToken ||= crypto.randomUUID();
            data.expires      ||= new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
            data.createdAt    ||= new Date();
            data.updatedAt    ||= new Date();
          }

          if (model === "Account") {
            data.provider           ||= data.providerId;
            data.providerAccountId  ||= data.accountId;
            data.createdAt          ||= new Date();
            data.updatedAt          ||= new Date();
          }
        }

        return query(args);
      },
    },
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId:     process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId:     process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
