#!/usr/bin/env node

import {
  addTask,
  listTasksm,
  updateTask,
  deleteTask,
  markInProgress,
  markDone,
} from "./tasks";

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add":
    addTask(argument);
    break;
  case "list":
    listTasks();
    break;
  case "list-todo":
    listTasks("todo");
    break;
  case "list-in-progress":
    listTasks("in-progress");
    break;
  case "list-done":
    listTasks("done");
    break;
  case "update":
    updateTask(args[1], args.slice(2).join(" "));
    break;
  case "delete":
    deleteTask(args[1]);
    break;
  case "mark-in-progress":
    markInProgress(args[1]);
    break;
  case "mark-done":
    markDone(args[1]);
    break;
  default:
    console.log(`Unknown command: "${command}"`);
    console.log(
      "Usage: node index.js <add|list|update|delete|mark-in-progress|mark-done>",
    );
}
