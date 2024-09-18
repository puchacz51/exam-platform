import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { schema } from '@schema/index';

const { DATABASE_URL = '' } = process.env;

const queryClient = postgres(DATABASE_URL);
const db: PostgresJsDatabase<typeof schema> = drizzle(queryClient);

export default db;
