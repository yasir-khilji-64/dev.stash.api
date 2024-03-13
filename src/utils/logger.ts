import { join } from 'path';
import pino, { Logger as PinoLogger, stdTimeFunctions, transport } from 'pino';

export enum LogLevel {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Verbose = 'verbose',
}

export class Logger {
  private logger: PinoLogger;
  private static level: LogLevel | null;
  private static instance: Logger | null = null;

  private constructor() {
    const transports = transport({
      targets: [
        {
          target: 'pino/file',
          level: LogLevel.Warn,
          options: {
            mkdir: true,
            destination: join(__dirname, '..', '..', 'logs', 'error.log'),
          },
        },
        {
          target: 'pino/file',
          level: Logger.level ?? LogLevel.Error,
          options: {
            mkdir: true,
            destination: join(__dirname, '..', '..', 'logs', 'app.log'),
          },
        },
        {
          target: 'pino-pretty',
          level: Logger.level ?? LogLevel.Error,
          options: { colorize: true },
        },
      ],
    });

    this.logger = pino(
      {
        timestamp: stdTimeFunctions.isoTime,
      },
      transports,
    );
  }

  public static setLogLevel(level: LogLevel): void {
    Logger.level = level;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public fatal(message: string, data?: unknown[]): void {
    this.logger.fatal(message, data);
  }

  public error(message: string, data?: unknown[]): void {
    this.logger.error(message, data);
  }

  public warn(message: string, data?: unknown[]): void {
    this.logger.warn(message, data);
  }

  public info(message: string, data?: unknown[]): void {
    this.logger.info(message, data);
  }

  public debug(message: string, data?: unknown[]): void {
    this.logger.debug(message, data);
  }

  public verbose(message: string, data?: unknown[]): void {
    this.logger.trace(message, data);
  }
}
