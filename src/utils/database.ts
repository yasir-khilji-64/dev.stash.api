import mongoose from 'mongoose';

import { config } from './config';
import { Logger } from './logger';

const logger = Logger.getInstance();

module Database {
  export const connectDB = async () => {
    try {
      const host = config.get('MONGO_HOST');
      const username = config.get('MONGO_USERNAME');
      const password = config.get('MONGO_PASSWORD');
      const database = config.get('MONGO_DATABASE');
      const uri = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority&appName=stash-dev`;
      mongoose.connection.on('connected', () => {
        logger.info('MongoDB Connected');
      });
      mongoose.connection.on('disconnected', () => {
        logger.debug('MongoDB Disconnected');
      });
      mongoose.connection.on('error', error => {
        logger.error(`MongoDB Connection Error: ${error}`);
      });
      await mongoose.connect(uri);
    } catch (error) {
      logger.error(`MongoDB connection error: ${error}`);
      process.exit(1);
    }
  };

  export const gracefulShutdown = async () => {
    try {
      await mongoose.disconnect();
      await mongoose.connection.close(true);
    } catch (error) {
      logger.error(`MongoDB disconnect error: ${error}`);
    }
  };
}

export default Database;
