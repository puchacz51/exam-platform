import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { questionsTable } from './questions';

export const matchingPairsTable = pgTable('matching_pairs', {
  id: uuid('id').primaryKey(),
  questionId: uuid('question_id')
    .references(() => questionsTable.id)
    .notNull(),
  key: varchar('key').notNull(),
  value: varchar('value').notNull(),
});

export const matchingPairsRelations = relations(
  matchingPairsTable,
  ({ one }) => ({
    question: one(questionsTable, {
      fields: [matchingPairsTable.questionId],
      references: [questionsTable.id],
    }),
  })
);
