import { config as load } from 'dotenv';
import { z } from 'zod';

class Config {
  private static config: Config | null = null;
  private static configSchema = z.object({
    PORT: z.coerce.number().min(1000).default(3003),
    NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
    MONGO_HOST: z.string({ required_error: 'MongoDB host is required' }),
    MONGO_USERNAME: z.string({
      required_error: 'MongoDB username is required',
    }),
    MONGO_PASSWORD: z.string({
      required_error: 'MongoDB password is required',
    }),
    MONGO_DATABASE: z.string({
      required_error: 'MongoDB database name is required',
    }),
  });
  private static configParser: any;

  private constructor() {
    load();

    Config.configParser = Config.configSchema.parse(process.env);
  }

  public static getInstance(): Config {
    if (!Config.config) {
      Config.config = new Config();
    }
    return Config.config;
  }

  public get<K extends keyof z.infer<typeof Config.configSchema>>(key: K) {
    return Config.configParser[key];
  }
}

export const config = Config.getInstance();
