import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  userID: serial('user_id').primaryKey(),
  firstname: varchar('firstname', { length: 256 }),
  lastname: varchar('lastname', { length: 256 }),
  email: varchar('email', { length: 256 }),
  passwordHash: varchar('password_hash', { length: 256 }),
  authProvider: varchar('auth_provider', { length: 256 }),
  createdAt: timestamp('created_at'),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
