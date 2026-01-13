-- AlterTable
ALTER TABLE "sandbox" ADD COLUMN     "startedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "SandboxMetric" (
    "id" TEXT NOT NULL,
    "sandboxId" TEXT NOT NULL,
    "cpu" DOUBLE PRECISION NOT NULL,
    "memory" DOUBLE PRECISION NOT NULL,
    "disk" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SandboxMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SandboxEvent" (
    "id" TEXT NOT NULL,
    "sandboxId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SandboxEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SandboxMetric_timestamp_idx" ON "SandboxMetric"("timestamp");
