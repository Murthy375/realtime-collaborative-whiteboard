import express, { Express, Request, Response, NextFunction } from "express";

const app: Express = express();

// middlewares
app.use(express.json());

// routes
app.get("/health", (req: Request, res: Response): void => {
  res.json({ status: "ok" });
});

// 404 catch-all
app.use((req: Request, res: Response): void => {
  res.status(404).json({ message: "No route found" });
});

// global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

export default app;
