import { SandboxResource } from "../resources/sandbox";
import { VyomaError } from "./error";

export interface VyomaClientOptions {
  apiKey: string;
  baseUrl?: string;
}

export class VyomaClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(options: VyomaClientOptions) {
    if (!options.apiKey) {
      throw new Error("Vyoma API key is required");
    }

    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? "http://sandboxd.vyoma.sbs";
  }

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        ...(options.headers || {}),
      },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new VyomaError(
        data?.error ?? "Vyoma API error",
        res.status,
        data?.code,
      );
    }

    return res.json() as Promise<T>;
  }
  sandbox = new SandboxResource(this);
}
