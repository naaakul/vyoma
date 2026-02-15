import { ID, ISODate } from "./core";

/* =====================
   Requests ✅ (RESTORED)
===================== */

export interface SandboxCreateRequest {
  templateId: ID;
  timeout?: number;
}

export interface SandboxStopRequest {
  sandboxId: ID;
}

export interface SandboxStatusRequest {
  sandboxId: ID;
}

export interface SandboxWriteRequest {
  sandboxId: ID;
  path: string;
  content: string;
}

export interface SandboxExecRequest {
  sandboxId: ID;
  command: string;
  cwd?: string;
}

/* =====================
   Responses
===================== */

export type SandboxStatus =
  | "starting"
  | "running"
  | "stopped"
  | "error";

export interface Sandbox {
  id: ID;
  templateId: ID;
  status: SandboxStatus;
  createdAt: ISODate;
  expiresAt?: ISODate;
  url?: string;
}

/* ✅ FIXED CREATE RESPONSE */
export interface SandboxCreateResponse {
  sandboxId: ID;
  url: string;
}

export interface SandboxStopResponse {
  sandboxId: ID;
  status: "stopped";
}

export interface SandboxStatusResponse {
  sandboxId: ID;
  status: SandboxStatus;
}

export interface SandboxWriteResponse {
  success: true;
}

export interface SandboxExecResponse {
  stdout: string;
  stderr: string;
  exitCode: number;
}
