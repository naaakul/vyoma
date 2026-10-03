import { core, net, exec, NAMESPACE } from "./k8s.js";
import { emitEvent } from "./events.js";

const ID_RE = /^[a-z0-9][a-z0-9-]{0,52}$/; // k8s names: lowercase, dashes only
const DOMAIN = "vyoma.sbs";

function assertId(id: string) {
  if (!ID_RE.test(id)) throw new Error("invalid sandboxId");
}

export async function startSandbox(sandboxId: string, image: string, port: number) {
  assertId(sandboxId);

  await core.createNamespacedPod({
    namespace: NAMESPACE,
    body: {
      metadata: { name: sandboxId, labels: { app: "sandbox", sandboxId } },
      spec: {
        containers: [{
          name: "app", image, ports: [{ containerPort: port }],
          resources: {
            limits: { memory: "512Mi", cpu: "500m" },
            requests: { memory: "128Mi", cpu: "100m" },
          },
        }],
        restartPolicy: "Never",
      },
    },
  });

  await core.createNamespacedService({
    namespace: NAMESPACE,
    body: {
      metadata: { name: sandboxId },
      spec: { selector: { sandboxId }, ports: [{ port, targetPort: port }] },
    },
  });

  await net.createNamespacedIngress({
    namespace: NAMESPACE,
    body: {
      metadata: {
        name: sandboxId,
        annotations: { "cert-manager.io/cluster-issuer": "letsencrypt" },
      },
      spec: {
        rules: [{
          host: `${sandboxId}.${DOMAIN}`,
          http: { paths: [{ path: "/", pathType: "Prefix",
            backend: { service: { name: sandboxId, port: { number: port } } } }] },
        }],
        tls: [{ hosts: [`${sandboxId}.${DOMAIN}`], secretName: `${sandboxId}-tls` }],
      },
    },
  });

  const url = `https://${sandboxId}.${DOMAIN}`;
  emitEvent({ type: "SANDBOX_STARTED", sandboxId, image, url, timestamp: Date.now() }).catch(console.error);
  return { url };
}

export async function stopSandbox(sandboxId: string) {
  assertId(sandboxId);
  await Promise.allSettled([
    core.deleteNamespacedPod({ name: sandboxId, namespace: NAMESPACE }),
    core.deleteNamespacedService({ name: sandboxId, namespace: NAMESPACE }),
    net.deleteNamespacedIngress({ name: sandboxId, namespace: NAMESPACE }),
  ]);
  emitEvent({ type: "SANDBOX_STOPPED", sandboxId, timestamp: Date.now() }).catch(console.error);
}

export async function execCommand(sandboxId: string, command: string, cwd?: string) {
  assertId(sandboxId);
  let stdout = "", stderr = "";
  const cmd = cwd ? `cd ${cwd} && ${command}` : command;
  const exitCode: number = await new Promise((resolve, reject) => {
    exec.exec(NAMESPACE, sandboxId, "app", ["sh", "-c", cmd], 
      { write: (c: Uint8Array) => (stdout += new TextDecoder().decode(c)) } as any,
      { write: (c: Uint8Array) => (stderr += new TextDecoder().decode(c)) } as any,
      null, false,
      (status) => resolve(status.status === "Success" ? 0 : 1)
    ).catch(reject);
  });
  return { stdout, stderr, exitCode };
}

export async function writeFile(sandboxId: string, path: string, content: string) {
  assertId(sandboxId);
  await execCommand(sandboxId, `mkdir -p "$(dirname "${path}")" && cat > "${path}"`); // see note below
}

export async function sandboxStatus(sandboxId: string) {
  assertId(sandboxId);
  try {
    const p = await core.readNamespacedPod({ name: sandboxId, namespace: NAMESPACE });
    return p.status?.phase === "Running" ? "running" : "stopped";
  } catch { return "stopped"; }
}