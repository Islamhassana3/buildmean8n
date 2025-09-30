import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const shouldSkip = process.env.HUSKY === "0" || process.env.HUSKY_SKIP_INSTALL === "1";

if (shouldSkip) {
  console.log("Husky installation skipped via environment override (HUSKY=0).");
  process.exit(0);
}

const binDir = resolve(process.cwd(), "node_modules", ".bin");
const candidateBinaries = ["husky", "husky.cmd", "husky.CMD"].map((name) => resolve(binDir, name));
const executable = candidateBinaries.find((candidate) => existsSync(candidate));

if (!executable) {
  console.log("Husky CLI not found (devDependencies likely omitted); skipping hook installation.");
  process.exit(0);
}

const result = spawnSync(executable, ["install"], { stdio: "inherit" });

if (result.error) {
  console.error("Failed to execute Husky install:", result.error);
  process.exit(result.status ?? 1);
}

process.exit(result.status ?? 0);
