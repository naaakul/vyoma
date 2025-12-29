// src/resources/sandbox.ts
var SandboxResource = class {
  constructor(client) {
    this.client = client;
  }
  create(data) {
    return this.client.request(
      "/sandbox/create",
      {
        method: "POST",
        body: JSON.stringify(data)
      }
    );
  }
  stop(sandboxId) {
    return this.client.request(
      "/sandbox/stop",
      {
        method: "POST",
        body: JSON.stringify({ sandboxId })
      }
    );
  }
  status(sandboxId) {
    return this.client.request(
      `/sandbox/status?sandboxId=${sandboxId}`,
      {
        method: "GET"
      }
    );
  }
  write(sandboxId, path, content) {
    return this.client.request(
      "/sandbox/write",
      {
        method: "POST",
        body: JSON.stringify({
          sandboxId,
          path,
          content
        })
      }
    );
  }
  exec(sandboxId, command, cwd) {
    return this.client.request(
      "/sandbox/exec",
      {
        method: "POST",
        body: JSON.stringify({
          sandboxId,
          command,
          cwd
        })
      }
    );
  }
};

// src/core/error.ts
var VyomaError = class extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = "VyomaError";
    this.status = status;
    this.code = code;
  }
};

// src/core/client.ts
var VyomaClient = class {
  constructor(options) {
    this.sandbox = new SandboxResource(this);
    if (!options.apiKey) {
      throw new Error("Vyoma API key is required");
    }
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl ?? "https://api.vyoma.dev";
  }
  async request(path, options = {}) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        ...options.headers || {}
      }
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new VyomaError(
        data?.error ?? "Vyoma API error",
        res.status,
        data?.code
      );
    }
    return res.json();
  }
};
export {
  VyomaClient
};
//# sourceMappingURL=index.mjs.map