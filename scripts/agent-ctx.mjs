// Context size of the coding agents that work in this repository.
// Run with: node scripts/agent-ctx.mjs [--max 120000] [--json] [--hours 6]
//
// The script reads the session files of Claude Code and of pi. It prints the
// context size of every session that is still fresh. It exits with code 1
// when a session is above --max. The parent agent uses that code to decide
// when to compact or to hand over.

import { readdir, readFile, stat } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
};

const workspace = flag("workspace", process.cwd());
const max = Number(flag("max", 0));
const hours = Number(flag("hours", 6));
const asJson = args.includes("--json");

const CONTEXT_LIMIT = 200000;

// Claude Code and pi mangle the path in different ways. Compare the path
// without slashes and dashes so every variant matches.
const key = (text) => text.replace(/[-/]/g, "").toLowerCase();

const workspaceKey = key(workspace);

const findDir = async (root) => {
  let entries = [];

  try {
    entries = await readdir(root, { withFileTypes: true });
  } catch {
    return null;
  }

  const match = entries.find(
    (entry) => entry.isDirectory() && key(entry.name) === workspaceKey,
  );

  return match ? join(root, match.name) : null;
};

const sources = [];

for (const [agent, root] of [
  ["claude", join(homedir(), ".claude", "projects")],
  ["pi", join(homedir(), ".pi", "agent", "sessions")],
]) {
  const dir = await findDir(root);
  if (dir) sources.push({ agent, dir });
}

const lastUsage = async (file) => {
  const content = await readFile(file, "utf8");
  let latest = null;

  for (const line of content.split("\n")) {
    if (!line.trim()) continue;

    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      continue;
    }

    const usage = entry?.message?.usage ?? entry?.usage;
    if (!usage) continue;

    const tokens =
      usage.input_tokens !== undefined
        ? usage.input_tokens +
          (usage.cache_read_input_tokens ?? 0) +
          (usage.cache_creation_input_tokens ?? 0)
        : (usage.input ?? 0) + (usage.cacheRead ?? 0) + (usage.cacheWrite ?? 0);

    if (!latest || tokens > latest.tokens) {
      latest = { tokens, timestamp: entry.timestamp ?? null };
    }
  }

  return latest;
};

const rows = [];

for (const source of sources) {
  let files = [];

  try {
    files = await readdir(source.dir);
  } catch {
    continue;
  }

  for (const name of files.filter((name) => name.endsWith(".jsonl"))) {
    const file = join(source.dir, name);
    const info = await stat(file);
    const ageHours = (Date.now() - info.mtimeMs) / 3600000;

    if (ageHours > hours) continue;

    const usage = await lastUsage(file);
    if (!usage) continue;

    rows.push({
      agent: source.agent,
      tokens: usage.tokens,
      percent: Math.round((usage.tokens / CONTEXT_LIMIT) * 100),
      ageMinutes: Math.round(ageHours * 60),
      file,
    });
  }
}

rows.sort((a, b) => b.tokens - a.tokens);

if (asJson) {
  console.log(JSON.stringify(rows, null, 2));
} else {
  for (const row of rows) {
    console.log(
      `${String(row.tokens).padStart(7)} tokens  ${String(row.percent).padStart(3)}%  ${row.agent.padEnd(6)}  ${row.ageMinutes}m ago  ${row.file}`,
    );
  }
  console.log(`agent-ctx: ${rows.length} sessions`);
}

const over = rows.filter((row) => max > 0 && row.tokens > max);

if (over.length > 0) {
  console.error(
    `over ${max} tokens: ${over.map((row) => `${row.agent} ${row.tokens}`).join(", ")}`,
  );
  process.exit(1);
}
