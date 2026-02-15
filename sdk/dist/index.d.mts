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
interface SandboxStatusRequest {
    sandboxId: ID;
}
interface SandboxWriteRequest {
    sandboxId: ID;
    path: string;
    content: string;
}
interface SandboxExecRequest {
    sandboxId: ID;
    command: string;
    cwd?: string;
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
    sandboxId: ID;
    url: string;
}
interface SandboxStopResponse {
    sandboxId: ID;
    status: "stopped";
}
interface SandboxStatusResponse {
    sandboxId: ID;
    status: SandboxStatus;
}
interface SandboxWriteResponse {
    success: true;
}
interface SandboxExecResponse {
    stdout: string;
    stderr: string;
    exitCode: number;
}

declare class SandboxResource {
    private client;
    constructor(client: VyomaClient);
    create(data: SandboxCreateRequest): Promise<SandboxCreateResponse>;
    stop(sandboxId: string): Promise<SandboxStopResponse>;
    status(sandboxId: string): Promise<SandboxStatusResponse>;
    write(sandboxId: string, path: string, content: string): Promise<SandboxWriteResponse>;
    exec(sandboxId: string, command: string, cwd?: string): Promise<SandboxExecResponse>;
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

export { type ApiError, type ID, type ISODate, type Sandbox, type SandboxCreateRequest, type SandboxCreateResponse, type SandboxExecRequest, type SandboxExecResponse, type SandboxStatus, type SandboxStatusRequest, type SandboxStatusResponse, type SandboxStopRequest, type SandboxStopResponse, type SandboxWriteRequest, type SandboxWriteResponse, VyomaClient };
