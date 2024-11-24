import { Config, defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({ path: '.env.local' });

export const configOptions: Config = {
  schema: './schema/*',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:gkOr0sTV7mQN@ep-jolly-base-a2m9b8hz.eu-central-1.aws.neon.tech/neondb?sslmode=require',
    // user: process.env.DATABASE_USER || '',
    // password: process.env.DATABASE_PASSWORD || '',
    // database: process.env.DATABASE_NAME || '',
    // host: process.env.DATABASE_HOST || '',
    // port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    // ssl: false,
  },
};

export default defineConfig(configOptions);
