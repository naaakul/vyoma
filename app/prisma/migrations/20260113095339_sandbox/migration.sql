/*
  Warnings:

  - Added the required column `lastHeartbeatAt` to the `sandbox` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sandbox" ADD COLUMN     "lastHeartbeatAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
