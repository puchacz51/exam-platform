import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from '@schema/users';

export const emailVerificationTokensTable = pgTable(
  'email_verification_tokens',
  {
    token: varchar('token', { length: 64 }).primaryKey(),
    userEmail: varchar('user_email')
      .notNull()
      .references(() => usersTable.email),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  }
);

export type InsertEmailVerificationToken =
  typeof emailVerificationTokensTable.$inferInsert;
export type SelectEmailVerificationToken =
  typeof emailVerificationTokensTable.$inferSelect;
