import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { questionsTable } from './questions';

export const booleanGroupSubQuestionsTable = pgTable(
  'boolean_group_sub_questions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    questionId: uuid('question_id')
      .references(() => questionsTable.id)
      .notNull(),
    text: text('text').notNull(),
    correctAnswer: boolean('correct_answer').notNull(),
    order: integer('order'),
  }
);

export const booleanGroupSubQuestionsRelations = relations(
  booleanGroupSubQuestionsTable,
  ({ one }) => ({
    question: one(questionsTable, {
      fields: [booleanGroupSubQuestionsTable.questionId],
      references: [questionsTable.id],
    }),
  })
);

export type InsertBooleanGroupSubQuestion =
  typeof booleanGroupSubQuestionsTable.$inferInsert;
export type SelectBooleanGroupSubQuestion =
  typeof booleanGroupSubQuestionsTable.$inferSelect;
