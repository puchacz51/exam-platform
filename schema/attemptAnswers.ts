import { pgTable, real, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionsTable } from '@schema/questions';
import { testAttemptsTable } from '@schema/testAttempt';

export const attemptAnswersTable = pgTable('attempt_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptId: uuid('attempt_id')
    .notNull()
    .references(() => testAttemptsTable.id, { onDelete: 'cascade' }),
  questionId: uuid('question_id')
    .notNull()
    .references(() => questionsTable.id, { onDelete: 'cascade' }),
  answeredAt: timestamp('answered_at').defaultNow(),
  points: real('points'),
});

export const attemptAnswersRelations = relations(
  attemptAnswersTable,
  ({ one }) => ({
    testAttempt: one(testAttemptsTable, {
      fields: [attemptAnswersTable.attemptId],
      references: [testAttemptsTable.id],
    }),
  })
);

export type InsertAttemptAnswer = typeof attemptAnswersTable.$inferInsert;
export type SelectAttemptAnswer = typeof attemptAnswersTable.$inferSelect;
