import express from "express";
import { createData, readFile } from "./controller.js";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
    readFile();
  console.log(`Server is running on port ${port}`);
});