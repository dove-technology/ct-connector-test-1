import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ message: "root GET responded..." });
});

app.post("/", (req: Request, res: Response) => {
  console.dir(req.body);
  res.status(200).send({ message: "root POST responded..." });
});

app.post("/test-service", (req: Request, res: Response) => {
  console.dir(req.body);
  res.status(200).send({ message: "test-service POST responded..." });
});

export default app;
