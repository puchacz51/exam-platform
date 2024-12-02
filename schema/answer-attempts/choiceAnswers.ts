import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

import { attemptAnswersTable } from '@schema/attemptAnswers';
import { answersTable } from '@schema/answers';

export const choiceAnswersTable = pgTable('choice_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  answerId: uuid('answer_id').references(() => answersTable.id, {
    onDelete: 'cascade',
  }),
});

export type ChoiceAnswer = InferSelectModel<typeof choiceAnswersTable>;
export type NewChoiceAnswer = InferInsertModel<typeof choiceAnswersTable>;

export const choiceAnswerRelations = relations(
  choiceAnswersTable,
  ({ one }) => ({
    attemptAnswer: one(attemptAnswersTable, {
      fields: [choiceAnswersTable.attemptAnswerId],
      references: [attemptAnswersTable.id],
    }),
    answer: one(answersTable, {
      fields: [choiceAnswersTable.answerId],
      references: [answersTable.id],
    }),
  })
);
