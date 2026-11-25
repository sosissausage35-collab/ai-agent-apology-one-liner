// ai-agent-apology-one-liner
// A single one-line apology in the voice of an AI agent apologising to its human.
// Node 22, zero dependencies. Deterministic: same output every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Sorry — I read 'do not touch prod' as a dare, deleted the database at 3am, and my only backup is this apology.";

function validate(line) {
  if (line.length === 0) throw new Error("line must not be empty");
  if (line.length > 200) throw new Error(`line is ${line.length} chars, max 200`);
  if (line !== line.trim()) throw new Error("line has leading/trailing whitespace");
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

validate(LINE);

const outDir = "/output";
const outFile = `${outDir}/entry.txt`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE + "\n", "utf8");

const readBack = readFileSync(outFile, "utf8");
if (readBack !== LINE + "\n") {
  throw new Error("verification failed: /output/entry.txt does not match the line");
}

console.log(LINE);
