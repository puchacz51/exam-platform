import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';

import { attemptAnswersTable } from '@schema/attemptAnswers';
import { matchingItemsTable } from '@schema/matchingItems';

export const matchingAnswersTable = pgTable('matching_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  keyItemId: uuid('key_item_id').references(() => matchingItemsTable.id, {
    onDelete: 'cascade',
  }),
  valueItemId: uuid('value_item_id').references(() => matchingItemsTable.id, {
    onDelete: 'cascade',
  }),
});

export type MatchingAnswer = InferSelectModel<typeof matchingAnswersTable>;
export type NewMatchingAnswer = InferInsertModel<typeof matchingAnswersTable>;

export const matchingAnswerRelations = relations(
  matchingAnswersTable,
  ({ one }) => ({
    attemptAnswer: one(attemptAnswersTable, {
      fields: [matchingAnswersTable.attemptAnswerId],
      references: [attemptAnswersTable.id],
    }),
    keyItem: one(matchingItemsTable, {
      fields: [matchingAnswersTable.keyItemId],
      references: [matchingItemsTable.id],
    }),
    valueItem: one(matchingItemsTable, {
      fields: [matchingAnswersTable.valueItemId],
      references: [matchingItemsTable.id],
    }),
  })
);
