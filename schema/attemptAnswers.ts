import { pgTable, real, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionsTable, questionTypeEnum } from '@schema/questions';
import { testAttemptsTable } from '@schema/testAttempt';
import {
  booleanAnswersTable,
  choiceAnswersTable,
  matchingAnswersTable,
  numericAnswersTable,
  openAnswersTable,
  orderAnswersTable,
} from '@schema/attemptAnswerDetails';

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
  ({ one, many }) => ({
    testAttempt: one(testAttemptsTable, {
      fields: [attemptAnswersTable.attemptId],
      references: [testAttemptsTable.id],
    }),
    question: one(questionsTable, {
      fields: [attemptAnswersTable.questionId],
      references: [questionsTable.id],
    }),
    booleanAnswers: many(booleanAnswersTable),
    matchingAnswers: many(matchingAnswersTable),
    choiceAnswers: many(choiceAnswersTable),
    orderAnswers: many(orderAnswersTable),
    openAnswers: many(openAnswersTable),
    numericAnswers: many(numericAnswersTable),
  })
);

export type InsertAttemptAnswer = typeof attemptAnswersTable.$inferInsert;
export type SelectAttemptAnswer = typeof attemptAnswersTable.$inferSelect;
