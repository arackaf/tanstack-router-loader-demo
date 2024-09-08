import express from "express";
// @ts-ignore
import cors from "cors";
import bodyParser from "body-parser";
import { setup } from "./db-setup";
import { query } from "./db-utils";

const jsonParser = bodyParser.json();

setup();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.json({});
});

app.get("/epics", function (req, res) {
  query("SELECT * FROM epics").then((epics) => {
    res.json(epics);
  });
});

app.post("/update", jsonParser, function (req, res) {
  console.log(req.body);
  res.json({ a: req.body });
});

app.listen(3000);
