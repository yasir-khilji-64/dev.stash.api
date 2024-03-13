import cors from 'cors';
import helmet from 'helmet';
import express, { Request, Response } from 'express';

import { config } from './utils/config';
import { LogLevel, Logger } from './utils/logger';

Logger.setLogLevel(
  config.get('NODE_ENV') === 'dev' ? LogLevel.Debug : LogLevel.Error,
);
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.json({
    status: 200,
    message: 'Hello, World',
  });
});

export default app;
