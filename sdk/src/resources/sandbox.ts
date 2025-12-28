import { VyomaClient } from "../core/client";
import {
  SandboxCreateRequest,
  SandboxCreateResponse,
  SandboxStatusResponse,
} from "../types/sandbox";

export class SandboxResource {
  constructor(private client: VyomaClient) {}

  create(data: SandboxCreateRequest) {
    return this.client.request<SandboxCreateResponse>(
      "/sandbox/create",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  }

  stop(sandboxId: string) {
    return this.client.request(
      "/sandbox/stop",
      {
        method: "POST",
        body: JSON.stringify({ sandboxId }),
      }
    );
  }

  status(sandboxId: string) {
    return this.client.request<SandboxStatusResponse>(
      `/sandbox/status?sandboxId=${sandboxId}`
    );
  }
}
