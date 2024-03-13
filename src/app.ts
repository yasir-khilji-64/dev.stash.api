import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

import { config } from './utils/config';
import { LogLevel, Logger } from './utils/logger';
import { errorHandler, notFound } from './middlewares/error-handler.middleware';

Logger.setLogLevel(
  config.get('NODE_ENV') === 'dev' ? LogLevel.Debug : LogLevel.Error,
);
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(notFound);
app.use(errorHandler);

export default app;
