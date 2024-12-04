import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

import { attemptAnswersTable } from '@schema/attemptAnswers';

export const openAnswersTable = pgTable('open_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  text: text('text'),
});

export type OpenAnswer = InferSelectModel<typeof openAnswersTable>;
export type NewOpenAnswer = InferInsertModel<typeof openAnswersTable>;

export const openAnswerRelations = relations(openAnswersTable, ({ one }) => ({
  attemptAnswer: one(attemptAnswersTable, {
    fields: [openAnswersTable.attemptAnswerId],
    references: [attemptAnswersTable.id],
  }),
}));
