import { emitMetrics } from "./events.js";

export function startMetricsLoop(getRunningSandboxes: () => any[]) {
  setInterval(async () => {
    const sandboxes = getRunningSandboxes();

    for (const sb of sandboxes) {
      await emitMetrics({
        sandboxId: sb.id,
        cpu: sb.cpuUsage,
        memory: sb.memoryUsage,
        disk: sb.diskUsage,
        timestamp: Date.now(),
      });
    }
  }, 5000);
}
