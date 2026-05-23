// storage.js
import { readFileSync, writeFileSync } from "fs";

const FILE = "tasks.json";

export function loadTasks() {
  try {
    const data = readFileSync(FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return []; // file doesn't exist yet — start fresh
  }
}

export function saveTasks(tasks) {
  writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}
