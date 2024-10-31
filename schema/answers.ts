import { boolean, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionsTable } from './questions';

export const answersTable = pgTable('answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionId: uuid('question_id')
    .notNull()
    .references(() => questionsTable.id),
  text: text('text').notNull(),
  isCorrect: boolean('is_correct').default(false),
  order: integer('order'),
});

export const answerRelations = relations(answersTable, ({ one }) => ({
  question: one(questionsTable, {
    fields: [answersTable.questionId],
    references: [questionsTable.id],
  }),
}));

export type InsertAnswer = typeof answersTable.$inferInsert;
export type SelectAnswer = typeof answersTable.$inferSelect;
