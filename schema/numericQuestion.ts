import { relations } from 'drizzle-orm';
import { integer, pgTable, real, serial } from 'drizzle-orm/pg-core';

import { questionsTable } from './questions';

export const numericQuestionsTable = pgTable('numeric_questions', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id')
    .references(() => questionsTable.id)
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
