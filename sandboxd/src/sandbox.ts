import { run } from "./docker.js";
import { emitEvent } from "./events.js";

const DOMAIN = "vyoma.sbs";

export async function startSandbox(
  sandboxId: string,
  image: string,
  containerPort: number
) {
  console.log("startSandbox", { sandboxId, image, containerPort });

  await run(
    `docker run -d \
    --name ${sandboxId} \
    -e VIRTUAL_HOST=${sandboxId}.${DOMAIN} \
    ${image}`
  );

  await emitEvent({
    type: "SANDBOX_STARTED",
    sandboxId,
    image,
    url: `http://${sandboxId}.${DOMAIN}`,
    timestamp: Date.now(),
  });

  return {
    url: `http://${sandboxId}.${DOMAIN}`,
  };
}

export async function stopSandbox(sandboxId: string) {
  await run(`docker rm -f ${sandboxId}`);

  await emitEvent({
    type: "SANDBOX_STOPPED",
    sandboxId,
    timestamp: Date.now(),
  });
}

export async function writeFile(
  sandboxId: string,
  path: string,
  content: string
) {
  const escaped = content.replace(/"/g, '\\"');

  await run(
    `docker exec ${sandboxId} sh -c "mkdir -p $(dirname ${path}) && echo \\"${escaped}\\" > ${path}"`
  );
}

export async function execCommand(
  sandboxId: string,
  command: string,
  cwd?: string
) {
  const cmd = cwd ? `cd ${cwd} && ${command}` : command;

  try {
    const stdout = await run(
      `docker exec ${sandboxId} sh -c "${cmd}"`
    );

    return {
      stdout,
      stderr: "",
      exitCode: 0,
    };
  } catch (err: any) {
    return {
      stdout: "",
      stderr: String(err),
      exitCode: 1,
    };
  }
}

export async function sandboxStatus(sandboxId: string) {
  try {
    await run(`docker inspect ${sandboxId}`);
    return "running";
  } catch {
    return "stopped";
  }
}
