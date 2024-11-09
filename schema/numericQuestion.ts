import { relations } from 'drizzle-orm';
import { pgTable, real, uuid } from 'drizzle-orm/pg-core';

import { questionsTable } from './questions';

export const numericQuestionsTable = pgTable('numeric_questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionId: uuid('question_id')
    .references(() => questionsTable.id, { onDelete: 'cascade' })
    .notNull(),
  correctAnswer: real('correct_answer').notNull(),
  tolerance: real('tolerance'),
});

export const numericQuestionsRelations = relations(
  numericQuestionsTable,
  ({ one }) => ({
    question: one(questionsTable, {
      fields: [numericQuestionsTable.questionId],
      references: [questionsTable.id],
    }),
  })
);
