import { docker } from "./docker.js";
import { v4 as uuid } from "uuid";

export async function createSandbox() {
  const id = `vyoma-${uuid()}`;

  const container = await docker.createContainer({
    Image: "node:20-alpine",
    name: id,
    Cmd: ["sh", "-c", "while true; do sleep 1; done"],
    Tty: false,
    HostConfig: {
      AutoRemove: true,
      Memory: 512 * 1024 * 1024, // 512 MB
      NanoCpus: 1_000_000_000,   // 1 CPU
    },
  });

  await container.start();

  return {
    id,
    status: "running",
  };
}

export async function stopSandbox(id: string) {
  const container = docker.getContainer(id);
  await container.stop();
}
