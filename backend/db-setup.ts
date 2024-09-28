import sqlite3Module from "sqlite3";
import { epics, tasks, users } from "./seed-data";

const sqlite3 = sqlite3Module.verbose();

export async function setup() {
  const db = new sqlite3.Database("backend/db.txt", sqlite3Module.OPEN_READWRITE, async (error) => {
    if (error) {
      console.error({ error });
      return;
    }

    await run("DROP TABLE IF EXISTS users");
    await run("CREATE TABLE users (id INT PRIMARY KEY, name TEXT)");

    await run("DROP TABLE IF EXISTS epics");
    await run("CREATE TABLE epics (id INT PRIMARY KEY, name TEXT)");

    await run("DROP TABLE IF EXISTS tasks");
    await run("CREATE TABLE tasks (id INT PRIMARY KEY, name TEXT, epicId INT, userId INT)");

    for (const user of users) {
      await run("INSERT INTO users VALUES (?, ?)", [user.id, user.name]);
    }

    for (const epic of epics) {
      await run("INSERT INTO epics VALUES (?, ?)", [epic.id, epic.title]);
    }

    let taskId = 1;
    for (const task of tasks) {
      await run("INSERT INTO tasks VALUES (?, ?, ?, ?)", [taskId++, task.name, task.epicId, task.userId]);
    }

    function run(command: string, params: unknown[] = []): Promise<void> {
      return new Promise((res, rej) => {
        db.run(command, params, (err) => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        });
      });
    }
  });
}
