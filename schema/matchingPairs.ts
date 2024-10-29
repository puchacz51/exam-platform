import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

import { questionsTable } from './questions';

export const matchingPairsTable = pgTable('matching_pairs', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id')
    .references(() => questionsTable.id)
    .notNull(),
  key: varchar('key').notNull(),
  value: varchar('value').notNull(),
  order: integer('order'),
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
