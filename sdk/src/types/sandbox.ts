import { ID, ISODate } from "./core";

/* =====================
   Requests
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

export interface SandboxCreateResponse {
  sandbox: Sandbox;
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
