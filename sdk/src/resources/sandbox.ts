import { VyomaClient } from "../core/client";
import {
  SandboxCreateRequest,
  SandboxCreateResponse,
  SandboxStatusResponse,
  SandboxStopResponse,
  SandboxWriteResponse,
  SandboxExecResponse,
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
    return this.client.request<SandboxStopResponse>(
      "/sandbox/stop",
      {
        method: "POST",
        body: JSON.stringify({ sandboxId }),
      }
    );
  }

  status(sandboxId: string) {
    return this.client.request<SandboxStatusResponse>(
      `/sandbox/status?sandboxId=${sandboxId}`,
      {
        method: "GET",
      }
    );
  }

  write(
    sandboxId: string,
    path: string,
    content: string
  ) {
    return this.client.request<SandboxWriteResponse>(
      "/sandbox/write",
      {
        method: "POST",
        body: JSON.stringify({
          sandboxId,
          path,
          content,
        }),
      }
    );
  }

  exec(
    sandboxId: string,
    command: string,
    cwd?: string
  ) {
    return this.client.request<SandboxExecResponse>(
      "/sandbox/exec",
      {
        method: "POST",
        body: JSON.stringify({
          sandboxId,
          command,
          cwd,
        }),
      }
    );
  }
}
