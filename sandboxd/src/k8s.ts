import * as k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();
kc.loadFromCluster(); 
export const core = kc.makeApiClient(k8s.CoreV1Api);
export const net = kc.makeApiClient(k8s.NetworkingV1Api);
export const exec = new k8s.Exec(kc);
export const NAMESPACE = process.env.SANDBOX_NAMESPACE || "sandboxes";