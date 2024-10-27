import express from "express";
import cookieParser from "cookie-parser";
// @ts-ignore
import cors from "cors";
import bodyParser, { json } from "body-parser";
import { setup } from "./db-setup";
import { command, query } from "./db-utils";
import { Task } from "../src/types";

const jsonParser = bodyParser.json();

setup();

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(jsonParser);

app.get("/", function (req, res) {
  res.json({});
});

app.get("/api/epics", function (req, res) {
  query("SELECT * FROM epics").then((epics) => {
    res.json(epics);
  });
});

app.get("/api/tasks/overview", function (req, res) {
  query(`
    SELECT u.name user, count(*) count
    FROM tasks t
    INNER JOIN users u
    ON t.userId = u.id
    GROUP BY u.id
  `).then((tasks) => {
    res.json(tasks);
  });
});

app.get("/api/tasks", async function (req, res) {
  const userId = Number(req.cookies.user);
  query(
    `
    SELECT * 
    FROM tasks t
    WHERE userId = ?
  `,
    [userId]
  )
    .then((tasks) => new Promise((res) => setTimeout(() => res(tasks), 750)))
    .then((tasks) => {
      res.json(tasks);
    });
});

app.get("/api/tasks/:id", async function (req, res) {
  query<Task[]>(
    `
    SELECT * 
    FROM tasks t
    WHERE id = ?
  `,
    [req.params.id]
  )
    .then((tasks) => new Promise((res) => setTimeout(() => res(tasks), 750)))
    .then((tasks: any) => {
      res.json(tasks[0]);
    });
});

app.post("/api/task/update", jsonParser, function (req, res) {
  const { id, title } = req.body;
  command(
    `
    UPDATE tasks
    SET title = ?
    WHERE id = ?  
  `,
    [title, id]
  ).then(() => {
    res.json({ sucess: true });
  });
});

app.listen(3000);
