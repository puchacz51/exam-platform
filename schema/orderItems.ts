import { relations } from 'drizzle-orm';
import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { questionsTable } from './questions';

export const orderItemsTable = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionId: uuid('question_id')
    .references(() => questionsTable.id, { onDelete: 'cascade' })
    .notNull(),
  text: text('text').notNull(),
  order: integer('order').notNull(),
});

export const orderItemsRelations = relations(orderItemsTable, ({ one }) => ({
  question: one(questionsTable, {
    fields: [orderItemsTable.questionId],
    references: [questionsTable.id],
  }),
}));
