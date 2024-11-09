import { relations } from 'drizzle-orm';
import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { questionsTable } from './questions';

export const numericGroupSubQuestionsTable = pgTable(
  'numeric_group_sub_questions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    questionId: uuid('question_id')
      .references(() => questionsTable.id, { onDelete: 'cascade' })
      .notNull(),
    text: text('text').notNull(),
    correctAnswer: integer('correct_answer').notNull(),
    tolerance: integer('tolerance'),
    order: integer('order'),
  }
);

export const numericGroupSubQuestionsRelations = relations(
  numericGroupSubQuestionsTable,
  ({ one }) => ({
    question: one(questionsTable, {
      fields: [numericGroupSubQuestionsTable.questionId],
      references: [questionsTable.id],
    }),
  })
);

export type InsertNumericGroupSubQuestion =
  typeof numericGroupSubQuestionsTable.$inferInsert;
export type SelectNumericGroupSubQuestion =
  typeof numericGroupSubQuestionsTable.$inferSelect;
