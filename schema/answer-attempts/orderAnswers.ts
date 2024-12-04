import { pgTable, real, uuid } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

import { attemptAnswersTable } from '@schema/attemptAnswers';
import { orderItemsTable } from '@schema/orderItems';

export const orderAnswersTable = pgTable('order_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  itemId: uuid('item_id').references(() => orderItemsTable.id, {
    onDelete: 'cascade',
  }),
  position: real('position').notNull(),
});

export type OrderAnswer = InferSelectModel<typeof orderAnswersTable>;
export type NewOrderAnswer = InferInsertModel<typeof orderAnswersTable>;

export const orderAnswerRelations = relations(orderAnswersTable, ({ one }) => ({
  attemptAnswer: one(attemptAnswersTable, {
    fields: [orderAnswersTable.attemptAnswerId],
    references: [attemptAnswersTable.id],
  }),
  item: one(orderItemsTable, {
    fields: [orderAnswersTable.itemId],
    references: [orderItemsTable.id],
  }),
}));
