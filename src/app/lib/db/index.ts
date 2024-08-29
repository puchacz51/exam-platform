import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { schema } from '../../../../schema';
const { DATABASE_URL = '' } = process.env;
// for migrations
// const migrationClient = postgres(DATABASE_URL, { max: 1 });
// migrate(drizzle(migrationClient), { migrationsFolder: 'drizzle' });

// for query purposes

const queryClient = postgres(DATABASE_URL);
const db: PostgresJsDatabase<typeof schema> = drizzle(queryClient);

export default db;
