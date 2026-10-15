import express from "express";
import type { Express, Request, Response } from "express";

const app = express();
const PORT = 8000;

app.listen(PORT, (): void => {
  console.log("working!!!");
});
