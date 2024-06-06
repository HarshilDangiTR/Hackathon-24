import express from "express";
import { createData, readFile } from "./controller.js";

const app = express();
const port = 3000;

app.get('/getApiResponse', (req, res) => {
  res.send(readFile());
});

app.post("/getVideoAnalysis", (req, res, next) => {
  const message = req.body.message;
  res.json(readFile(req.body));
 });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});