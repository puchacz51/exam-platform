import { relations } from 'drizzle-orm';
import { integer, pgTable,  serial, text } from 'drizzle-orm/pg-core';

import { questionsTable } from './questions';

export const orderItemsTable = pgTable('order_items', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id')
    .references(() => questionsTable.id)
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
