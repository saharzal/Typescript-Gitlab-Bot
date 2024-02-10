// src/app.ts
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { handle_merge_request_event } from "./eventHanlders";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/webhook", (req: Request, res: Response) => {
  const data = req.body;
  if ("object_kind" in data && data.object_kind === "merge_request") {
    handle_merge_request_event(data);
  }
  res.json({ received: true, message: "received" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
