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

app.get("/api/tasks/overview", function (req, res) {
  query(`
    SELECT u.name user, count(*) count
    FROM tasks t
    INNER JOIN users u
    ON t.userId = u.id
    GROUP BY u.id
  `)
    .then(tasks => new Promise(res => setTimeout(() => res(tasks), 750)))
    .then(tasks => {
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
    [userId],
  )
    .then(tasks => new Promise(res => setTimeout(() => res(tasks), 750)))
    .then(tasks => {
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
    [req.params.id],
  )
    .then(tasks => new Promise(res => setTimeout(() => res(tasks), 750)))
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
    [title, id],
  ).then(() => {
    res.json({ sucess: true });
  });
});

app.get("/api/epics/overview", async function (req, res) {
  query<Task[]>(
    `
      WITH aggregates AS (
          SELECT epicId, count(*) count
          FROM epics e
          INNER JOIN tasks t
          ON e.id = t.epicId
          GROUP BY epicId
      )
      SELECT e.name, agg.count
      FROM epics e
      INNER JOIN aggregates agg
      ON e.id = agg.epicId
      ORDER BY count ASC
  `,
    [],
  )
    .then(result => new Promise(res => setTimeout(() => res(result), 750)))
    .then((result: any) => {
      res.json(result);
    });
});

app.get("/api/epics", function (req, res) {
  const page = parseInt(req.query.page as string);
  query("SELECT * FROM epics LIMIT ?, 4", [(page - 1) * 4])
    .then(result => new Promise(res => setTimeout(() => res(result), 750)))
    .then((result: any) => {
      res.json(result);
    });
});

app.get("/api/epics/count", function (req, res) {
  query("SELECT COUNT(*) count FROM epics")
    .then(result => new Promise(res => setTimeout(() => res(result), 750)))
    .then((result: any) => {
      res.json(result);
    });
});

app.get("/api/epics/:id", async function (req, res) {
  query<Task[]>(
    `
    SELECT * 
    FROM epics
    WHERE id = ?
  `,
    [parseInt(req.params.id)],
  )
    .then(epics => new Promise(res => setTimeout(() => res(epics), 750)))
    .then((epics: any) => {
      res.json(epics[0]);
    });
});

app.post("/api/epic/update", jsonParser, function (req, res) {
  const { id, name } = req.body;
  command(
    `
    UPDATE epics
    SET name = ?
    WHERE id = ?  
    `,
    [name, id],
  ).then(() => {
    res.json({ sucess: true });
  });
});

app.get("/api/epics/:id/milestones", async function (req, res) {
  query<Task[]>(
    `
    SELECT * 
    FROM milestones
    WHERE epicId = ?
    ORDER BY id ASC
  `,
    [parseInt(req.params.id)],
  )
    .then(epics => new Promise(res => setTimeout(() => res(epics), 750)))
    .then((milestones: any) => {
      res.json(milestones);
    });
});

app.listen(3000);
