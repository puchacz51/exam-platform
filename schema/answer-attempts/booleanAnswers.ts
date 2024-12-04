import { boolean, pgTable, uuid } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

import { attemptAnswersTable } from '@schema/attemptAnswers';
import { groupSubQuestionsTable } from '@schema/groupSubQuestions';

export const booleanAnswersTable = pgTable('boolean_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  subQuestionId: uuid('sub_question_id').references(
    () => groupSubQuestionsTable.id,
    { onDelete: 'cascade' }
  ),
  value: boolean('value'),
});

export type BooleanAnswer = InferSelectModel<typeof booleanAnswersTable>;
export type NewBooleanAnswer = InferInsertModel<typeof booleanAnswersTable>;

export const booleanAnswerRelations = relations(
  booleanAnswersTable,
  ({ one }) => ({
    attemptAnswer: one(attemptAnswersTable, {
      fields: [booleanAnswersTable.attemptAnswerId],
      references: [attemptAnswersTable.id],
    }),
    subQuestion: one(groupSubQuestionsTable, {
      fields: [booleanAnswersTable.subQuestionId],
      references: [groupSubQuestionsTable.id],
    }),
  })
);
