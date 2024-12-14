import { pgTable, real, uuid } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

import { attemptAnswersTable } from '@schema/attemptAnswers';
import { groupSubQuestionsTable } from '@schema/groupSubQuestions';

export const numericAnswersTable = pgTable('numeric_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  subQuestionId: uuid('sub_question_id').references(
    () => groupSubQuestionsTable.id,
    { onDelete: 'cascade' }
  ),
  value: real('value'),
});

export type NumericAnswer = InferSelectModel<typeof numericAnswersTable>;
export type NewNumericAnswer = InferInsertModel<typeof numericAnswersTable>;

export const numericAnswerRelations = relations(
  numericAnswersTable,
  ({ one }) => ({
    attemptAnswer: one(attemptAnswersTable, {
      fields: [numericAnswersTable.attemptAnswerId],
      references: [attemptAnswersTable.id],
    }),
    GSQ: one(groupSubQuestionsTable, {
      fields: [numericAnswersTable.subQuestionId],
      references: [groupSubQuestionsTable.id],
    }),
  })
);
