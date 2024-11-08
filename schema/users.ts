import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstname: varchar('firstname', { length: 256 }),
  lastname: varchar('lastname', { length: 256 }),
  email: varchar('email', { length: 256 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 256 }).notNull(),
  authProvider: varchar('auth_provider', { length: 256 }),
  createdAt: timestamp('created_at'),
  emailConfirmed: timestamp('email_confirmed'),
  profileNeedsCompletion: boolean('profile_needs_completion')
    .notNull()
    .default(false),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
