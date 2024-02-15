// src/app.ts
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { handleMergeRequestEvent } from "./eventHanlders";
import * as Redis from "redis";
import { REDIS_CONNECTION_URL } from "./constants";

const app = express();
const port = 3000;
export const redisClient = Redis.createClient({
  url: REDIS_CONNECTION_URL,
});
redisClient.on("connect", () => console.log("DB connected"));
redisClient.on("error", (err) => console.log("Redis Connection Error", err));
redisClient.connect();

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Gitlab Bot!");
});

app.post("/webhook", async (req: Request, res: Response) => {
  const data = req.body;
  if ("object_kind" in data && data.object_kind === "merge_request") {
    await handleMergeRequestEvent(data);
  }
  res.json({ received: true, message: "received" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
