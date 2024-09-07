import express from "express";
// @ts-ignore
import cors from "cors";
import bodyParser from "body-parser";

const jsonParser = bodyParser.json();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.json({ msg: "Hello World" });
});

app.post("/update", jsonParser, function (req, res) {
  console.log(req.body);
  res.json({ a: req.body });
});

app.listen(3000);
