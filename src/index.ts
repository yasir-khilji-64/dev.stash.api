import app from './app';
import { config } from './utils/config';
import { Logger } from './utils/logger';

const port = config.get('PORT');
const logger = Logger.getInstance();

app.listen(port, '0.0.0.0', () => {
  logger.info(`Server listening on http://localhost:${port}`);
});
