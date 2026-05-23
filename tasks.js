import { loadTasks, saveTasks } from "./storage.js";

function addTask(description) {
  if (!description) {
    console.log("Please provide a task description.");
    return;
  }

  const tasks = loadTasks();

  const task = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(task);
  saveTasks(tasks);
  console.log(`Task added (ID: ${task.id})`);
}

function listTasks(filterStatus = null) {
  const tasks = loadTasks();

  if (tasks.length === 0) {
    console.log("No tasks found.");
    return;
  }

  const filtered = filterStatus
    ? tasks.filter((t) => t.status === filterStatus)
    : tasks;

  if (filtered.length === 0) {
    console.log(`No tasks with status "${filterStatus}".`);
    return;
  }

  filtered.forEach((task) => {
    console.log(`[${task.id}] ${task.description} — ${task.status}`);
  });
}

function updateTask(id, description) {
  if (!id || !description) {
    console.log("Usage: node index.js update <id> <new description>");
    return;
  }

  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    console.log(`No task found with ID ${id}.`);
    return;
  }

  task.description = description;
  task.updatedAt = new Date().toISOString();

  saveTasks(tasks);
  console.log(`Task ${id} updated.`);
}

function deleteTask(id) {
  if (!id) {
    console.log("Usage: node index.js delete <id>");
    return;
  }

  const tasks = loadTasks();
  const index = tasks.findIndex((t) => t.id === Number(id));

  if (index === -1) {
    console.log(`No task found with ID ${id}.`);
    return;
  }

  const removed = tasks.splice(index, 1);
  saveTasks(tasks);
  console.log(`Task "${removed[0].description}" deleted.`);
}

function markStatus(id, status) {
  if (!id) {
    console.log(`Usage: node index.js mark-${status} <id>`);
    return;
  }

  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    console.log(`No task found with ID ${id}.`);
    return;
  }

  task.status = status;
  task.updatedAt = new Date().toISOString();

  saveTasks(tasks);
  console.log(`Task ${id} marked as ${status}.`);
}

function markInProgress(id) {
  markStatus(id, "in-progress");
}

function markDone(id) {
  markStatus(id, "done");
}

export { addTask, listTasks, updateTask, deleteTask, markInProgress, markDone };
