import { pgTable, real, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { testsTable } from '@schema/test';
import { usersTable } from '@schema/users';
import { questionsTable } from '@schema/questions';

export const testAttemptsTable = pgTable('test_attempts', {
  id: uuid('id').primaryKey().defaultRandom(),
  testId: uuid('test_id')
    .notNull()
    .references(() => testsTable.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => usersTable.id),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  finishedAt: timestamp('finished_at'),
  totalPoints: real('total_points'),
});

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

export const testAttemptsRelations = relations(
  testAttemptsTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [testAttemptsTable.userId],
      references: [usersTable.id],
    }),
    test: one(testsTable, {
      fields: [testAttemptsTable.testId],
      references: [testsTable.id],
    }),
    answers: many(attemptAnswersTable),
  })
);

export const attemptAnswersRelations = relations(
  attemptAnswersTable,
  ({ one }) => ({
    testAttempt: one(testAttemptsTable, {
      fields: [attemptAnswersTable.attemptId],
      references: [testAttemptsTable.id],
    }),
  })
);

export type InsertTestAttempt = typeof testAttemptsTable.$inferInsert;
export type SelectTestAttempt = typeof testAttemptsTable.$inferSelect;
export type InsertAttemptAnswer = typeof attemptAnswersTable.$inferInsert;
export type SelectAttemptAnswer = typeof attemptAnswersTable.$inferSelect;
