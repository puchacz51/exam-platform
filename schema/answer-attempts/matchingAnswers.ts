import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

import { attemptAnswersTable } from '@schema/attemptAnswers';

export const matchingAnswersTable = pgTable('matching_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  key: varchar('key'),
  value: varchar('value'),
});

export type MatchingAnswer = InferSelectModel<typeof matchingAnswersTable>;
export type NewMatchingAnswer = InferInsertModel<typeof matchingAnswersTable>;

export const matchingAnswerRelations = relations(
  matchingAnswersTable,
  ({ one }) => ({
    attemptAnswer: one(attemptAnswersTable, {
      fields: [matchingAnswersTable.attemptAnswerId],
      references: [attemptAnswersTable.id],
    }),
  })
);
