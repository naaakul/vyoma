import { run } from "./docker";
export async function startSandbox(sandboxId, image, containerPort) {
    console.log("startSandbox", { sandboxId, image, containerPort });
    await run(`docker run -d --name ${sandboxId} -p 0:${containerPort} ${image}`);
    const port = await run(`docker port ${sandboxId} ${containerPort}`);
    const hostPort = port.split(":").pop()?.trim();
    return { hostPort };
}
export async function stopSandbox(sandboxId) {
    await run(`docker rm -f ${sandboxId}`);
}
export async function writeFile(sandboxId, path, content) {
    const escaped = content.replace(/"/g, '\\"');
    await run(`docker exec ${sandboxId} sh -c "mkdir -p $(dirname ${path}) && echo \\"${escaped}\\" > ${path}"`);
}
export async function execCommand(sandboxId, command, cwd) {
    const cmd = cwd ? `cd ${cwd} && ${command}` : command;
    try {
        const stdout = await run(`docker exec ${sandboxId} sh -c "${cmd}"`);
        return {
            stdout,
            stderr: "",
            exitCode: 0,
        };
    }
    catch (err) {
        return {
            stdout: "",
            stderr: String(err),
            exitCode: 1,
        };
    }
}
export async function sandboxStatus(sandboxId) {
    try {
        await run(`docker inspect ${sandboxId}`);
        return "running";
    }
    catch {
        return "stopped";
    }
}
