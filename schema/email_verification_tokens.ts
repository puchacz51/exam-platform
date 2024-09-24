import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

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

export const emailVerificationTokensRelations = relations(
  emailVerificationTokensTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [emailVerificationTokensTable.userEmail],
      references: [usersTable.email],
    }),
  })
);

export type InsertEmailVerificationToken =
  typeof emailVerificationTokensTable.$inferInsert;
export type SelectEmailVerificationToken =
  typeof emailVerificationTokensTable.$inferSelect;
