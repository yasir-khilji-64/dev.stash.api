import app from './app';
import { config } from './utils/config';
import { Logger } from './utils/logger';
import Database from './utils/database';

const bootstrap = async () => {
  const port: number = config.get('PORT');
  const logger = Logger.getInstance();

  await Database.connectDB();
  const server = app.listen(port, '0.0.0.0', () => {
    logger.info(`Server listening on http://localhost:${port}`);
  });

  process.on('SIGINT', async () => {
    await Database.gracefulShutdown();
    server.close();
    process.exit(1);
  });

  process.on('SIGTERM', async () => {
    await Database.gracefulShutdown();
    server.close();
    process.exit(1);
  });
};

bootstrap();
