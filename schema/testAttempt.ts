import { pgTable, real, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { usersTable } from '@schema/users';
import { attemptAnswersTable } from '@schema/attemptAnswers';
import { testAccessConfigTable } from '@schema/testAccess';

export const testAttemptsTable = pgTable('test_attempts', {
  id: uuid('id').primaryKey().defaultRandom(),
  testAccessId: uuid('test_id')
    .notNull()
    .references(() => testAccessConfigTable.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => usersTable.id),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  finishedAt: timestamp('finished_at'),
  totalPoints: real('total_points'),
});

export const testAttemptsRelations = relations(
  testAttemptsTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [testAttemptsTable.userId],
      references: [usersTable.id],
    }),
    testAccess: one(testAccessConfigTable, {
      fields: [testAttemptsTable.testAccessId],
      references: [testAccessConfigTable.id],
    }),
    answers: many(attemptAnswersTable),
  })
);

export type InsertTestAttempt = typeof testAttemptsTable.$inferInsert;
export type SelectTestAttempt = typeof testAttemptsTable.$inferSelect;
