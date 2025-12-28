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

export interface SandboxStatusResponse {
  sandboxId: ID;
  status: SandboxStatus;
}
