import express from "express";
import cookieParser from "cookie-parser";
// @ts-ignore
import cors from "cors";
import bodyParser from "body-parser";
import { setup } from "./db-setup";
import { query } from "./db-utils";

const jsonParser = bodyParser.json();

setup();

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

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
  `).then((epics) => {
    res.json(epics);
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
  ).then((epics) => {
    res.json(epics);
  });
});

app.post("/update", jsonParser, function (req, res) {
  console.log(req.body);
  res.json({ a: req.body });
});

app.listen(3000);
