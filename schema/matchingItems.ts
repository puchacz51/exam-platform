import { questionsTable } from '@schema/questions';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, uuid, integer } from 'drizzle-orm/pg-core';


export const matchingItemTypeEnum = pgEnum('matching_item_type', [
  'KEY',
  'VALUE',
]);

export const matchingItemsTable = pgTable('matching_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionId: uuid('question_id')
    .references(() => questionsTable.id, { onDelete: 'cascade' })
    .notNull(),
  text: text('text').notNull(),
  type: matchingItemTypeEnum('type').notNull(),
  pairIndex: integer('pair_index').notNull(),
  order: integer('order'),
});

export const matchingItemsRelations = relations(
  matchingItemsTable,
  ({ one }) => ({
    question: one(questionsTable, {
      fields: [matchingItemsTable.questionId],
      references: [questionsTable.id],
    }),
  })
);

export type InsertMatchingItem = typeof matchingItemsTable.$inferInsert;
export type SelectMatchingItem = typeof matchingItemsTable.$inferSelect;
