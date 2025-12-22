import { exec } from "child_process";

export function run(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(stderr || err.message);
      else resolve(stdout.trim());
    });
  });
}
