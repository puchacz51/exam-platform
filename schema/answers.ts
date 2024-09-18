import { boolean, integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

import { questionsTable } from './questions';

export const answersTable = pgTable('answers', {
  id: serial('id').primaryKey(),
  questionID: integer('question_id').references(() => questionsTable.id),
  text: text('text'),
  isCorrect: boolean('is_correct').default(false),
  order: integer('order'),
});

export type InsertAnswer = typeof answersTable.$inferInsert;
export type SelectAnswer = typeof answersTable.$inferSelect;
