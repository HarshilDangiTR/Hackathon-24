import express from "express";
import { getStatsForAllVideos, getMostSuccessFulVideo } from "./controller.js";
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(cors()); 
var jsonParser = bodyParser.json() 

app.get('/test', (req, res) => {
  res.send("hiii");
});

app.post("/getSuccessParamForAllVideos", jsonParser, async (req, res, next) => {
  const response = await getStatsForAllVideos(req.body);
  res.send(response);
 });

app.post("/getMostSuccessfulVideo", jsonParser, async (req, res, next) => {
const response = await getMostSuccessFulVideo(req.body);
res.send(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});