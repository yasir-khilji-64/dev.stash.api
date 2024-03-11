import cors from "cors";
import helmet from "helmet";
import express from "express";

import { LogLevel, Logger } from "./utils/logger";

Logger.setLogLevel(LogLevel.Debug);
const logger = Logger.getInstance();
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.json({
    status: 200,
    message: "Hello, World",
  });
});

export default app;
