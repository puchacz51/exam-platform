import { questionsTable } from '@schema/questions';
import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  uuid,
} from 'drizzle-orm/pg-core';

export const subQuestionTypeEnum = pgEnum('sub_question_type', [
  'NUMERIC',
  'BOOLEAN',
]);

export const groupSubQuestionsTable = pgTable('group_sub_questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionId: uuid('question_id')
    .references(() => questionsTable.id, { onDelete: 'cascade' })
    .notNull(),
  text: text('text').notNull(),
  type: subQuestionTypeEnum('type').notNull(),
  numericAnswer: real('numeric_answer'),
  tolerance: real('tolerance'),
  booleanAnswer: boolean('boolean_answer'),
  order: integer('order'),
});

export const groupSubQuestionsRelations = relations(
  groupSubQuestionsTable,
  ({ one }) => ({
    question: one(questionsTable, {
      fields: [groupSubQuestionsTable.questionId],
      references: [questionsTable.id],
    }),
  })
);

export type InsertGroupSubQuestion = typeof groupSubQuestionsTable.$inferInsert;
export type SelectGroupSubQuestion = typeof groupSubQuestionsTable.$inferSelect;
