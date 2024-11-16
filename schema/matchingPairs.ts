import { questionsTable } from '@schema/questions';
import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const matchingPairsTable = pgTable('matching_pairs', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionId: uuid('question_id')
    .references(() => questionsTable.id, { onDelete: 'cascade' })
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

export type InsertMatchingPair = typeof matchingPairsTable.$inferInsert;
export type SelectMatchingPair = typeof matchingPairsTable.$inferSelect;
