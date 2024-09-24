import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionsTable } from './questions';

export const answersTable = pgTable('answers', {
  id: serial('id').primaryKey(),
  questionID: integer('question_id')
    .notNull()
    .references(() => questionsTable.id),
  text: text('text').notNull(),
  isCorrect: boolean('is_correct').default(false),
  order: integer('order'),
});

export const answerRelations = relations(answersTable, ({ one }) => ({
  question: one(questionsTable, {
    fields: [answersTable.questionID],
    references: [questionsTable.id],
  }),
}));

export type InsertAnswer = typeof answersTable.$inferInsert;
export type SelectAnswer = typeof answersTable.$inferSelect;