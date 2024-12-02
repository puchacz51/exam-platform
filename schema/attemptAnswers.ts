import { pgTable, real, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionsTable, questionTypeEnum } from '@schema/questions';
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
  type: questionTypeEnum('type').notNull(),
});

export const attemptAnswersRelations = relations(
  attemptAnswersTable,
  ({ one }) => ({
    testAttempt: one(testAttemptsTable, {
      fields: [attemptAnswersTable.attemptId],
      references: [testAttemptsTable.id],
    }),
    question: one(questionsTable, {
      fields: [attemptAnswersTable.questionId],
      references: [questionsTable.id],
    }),
  })
);

export type InsertAttemptAnswer = typeof attemptAnswersTable.$inferInsert;
export type SelectAttemptAnswer = typeof attemptAnswersTable.$inferSelect;
