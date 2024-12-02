import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { usersTable } from '@schema/users';

export const verificationTokensTable = pgTable('email_verification_tokens', {
  token: varchar('token', { length: 64 }).primaryKey(),
  userEmail: varchar('user_email')
    .notNull()
    .references(() => usersTable.email),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const verificationTokensRelations = relations(
  verificationTokensTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [verificationTokensTable.userEmail],
      references: [usersTable.email],
    }),
  })
);

export type InsertEmailVerificationToken =
  typeof verificationTokensTable.$inferInsert;
export type SelectEmailVerificationToken =
  typeof verificationTokensTable.$inferSelect;
