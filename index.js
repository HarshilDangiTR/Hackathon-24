import express from "express";
import { readFile } from "./controller.js";
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors()); 
var jsonParser = bodyParser.json() 

app.get('/test', (req, res) => {
  res.send("hiii");
});

app.post("/getVideoAnalysis", jsonParser, async (req, res, next) => {
  const response = await readFile(req.body);
  res.send(response);
 });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});