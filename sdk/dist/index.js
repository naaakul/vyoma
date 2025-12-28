"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  VyomaClient: () => VyomaClient
});
module.exports = __toCommonJS(index_exports);

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
      `/sandbox/status?sandboxId=${sandboxId}`
    );
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
      const text = await res.text();
      throw new Error(`Vyoma API error (${res.status}): ${text}`);
    }
    return res.json();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VyomaClient
});
//# sourceMappingURL=index.js.map