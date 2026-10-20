import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 8000;

// 404 catch-all ↓
app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: `page not found` });
});

app.listen(PORT, (): void => {
  console.log("working!!!");
});
