import app from './app';
import { config } from './utils/config';
import { Logger } from './utils/logger';
import { connectDB } from './utils/database';

const bootstrap = async () => {
  const port = config.get('PORT');
  const logger = Logger.getInstance();

  await connectDB();
  app.listen(port, '0.0.0.0', () => {
    logger.info(`Server listening on http://localhost:${port}`);
  });
};

bootstrap();
