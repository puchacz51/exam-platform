import { relations } from 'drizzle-orm';
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { groupsTable } from '@schema/groups';
import { testsTable } from '@schema/test';
import { testAttemptsTable } from '@schema/testAttempt';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstname: varchar('firstname', { length: 256 }),
  lastname: varchar('lastname', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 256 }).notNull(),
  authProvider: varchar('auth_provider', { length: 256 }),
  createdAt: timestamp('created_at').defaultNow(),
  emailConfirmed: timestamp('email_confirmed'),
  profileNeedsCompletion: boolean('profile_needs_completion')
    .notNull()
    .default(false),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  testOwner: many(testsTable),
  groupOwner: many(groupsTable),
  testAttempts: many(testAttemptsTable),
}));

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
