type ID = string;
type ISODate = string;
interface ApiError {
    error: string;
    code?: string;
}

interface SandboxCreateRequest {
    templateId: ID;
    timeout?: number;
}
interface SandboxStopRequest {
    sandboxId: ID;
}
type SandboxStatus = "starting" | "running" | "stopped" | "error";
interface Sandbox {
    id: ID;
    templateId: ID;
    status: SandboxStatus;
    createdAt: ISODate;
    expiresAt?: ISODate;
    url?: string;
}
interface SandboxCreateResponse {
    sandbox: Sandbox;
}
interface SandboxStatusResponse {
    sandboxId: ID;
    status: SandboxStatus;
}

declare class SandboxResource {
    private client;
    constructor(client: VyomaClient);
    create(data: SandboxCreateRequest): Promise<SandboxCreateResponse>;
    stop(sandboxId: string): Promise<unknown>;
    status(sandboxId: string): Promise<SandboxStatusResponse>;
}

interface VyomaClientOptions {
    apiKey: string;
    baseUrl?: string;
}
declare class VyomaClient {
    private apiKey;
    private baseUrl;
    constructor(options: VyomaClientOptions);
    request<T>(path: string, options?: RequestInit): Promise<T>;
    sandbox: SandboxResource;
}

export { type ApiError, type ID, type ISODate, type Sandbox, type SandboxCreateRequest, type SandboxCreateResponse, type SandboxStatus, type SandboxStatusResponse, type SandboxStopRequest, VyomaClient };
