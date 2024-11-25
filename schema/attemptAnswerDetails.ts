import { boolean, pgTable, real, text, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { attemptAnswersTable } from '@schema/attemptAnswers';
import { matchingItemsTable } from '@schema/matchingItems';
import { answersTable } from '@schema/answers';
import { orderItemsTable } from '@schema/orderItems';
import { groupSubQuestionsTable } from '@schema/groupSubQuestions';

export const openAnswersTable = pgTable('open_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  text: text('text'),
});

export const choiceAnswersTable = pgTable('choice_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  answerId: uuid('answer_id').references(() => answersTable.id, {
    onDelete: 'cascade',
  }),
});

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

export const orderAnswersTable = pgTable('order_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  itemId: uuid('item_id').references(() => orderItemsTable.id, {
    onDelete: 'cascade',
  }),
  position: real('position'),
});

export const numericAnswersTable = pgTable('numeric_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  subQuestionId: uuid('sub_question_id').references(
    () => groupSubQuestionsTable.id,
    { onDelete: 'cascade' }
  ),
  value: real('value'),
});

export const booleanAnswersTable = pgTable('boolean_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  attemptAnswerId: uuid('attempt_answer_id')
    .notNull()
    .references(() => attemptAnswersTable.id, { onDelete: 'cascade' }),
  subQuestionId: uuid('sub_question_id').references(
    () => groupSubQuestionsTable.id,
    { onDelete: 'cascade' }
  ),
  value: boolean('value'),
});

export const attemptAnswerRelations = relations(
  attemptAnswersTable,
  ({ many }) => ({
    openAnswers: many(openAnswersTable),
    choiceAnswers: many(choiceAnswersTable),
    matchingAnswers: many(matchingAnswersTable),
    orderAnswers: many(orderAnswersTable),
    numericAnswers: many(numericAnswersTable),
    booleanAnswers: many(booleanAnswersTable),
  })
);

export const openAnswerRelations = relations(openAnswersTable, ({ one }) => ({
  attemptAnswer: one(attemptAnswersTable, {
    fields: [openAnswersTable.attemptAnswerId],
    references: [attemptAnswersTable.id],
  }),
}));

export const choiceAnswerRelations = relations(choiceAnswersTable, ({ one }) => ({
  attemptAnswer: one(attemptAnswersTable, {
    fields: [choiceAnswersTable.attemptAnswerId],
    references: [attemptAnswersTable.id],
  }),
  answer: one(answersTable, {
    fields: [choiceAnswersTable.answerId],
    references: [answersTable.id],
  }),
}));

export const matchingAnswerRelations = relations(matchingAnswersTable, ({ one }) => ({
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
}));

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

export const numericAnswerRelations = relations(numericAnswersTable, ({ one }) => ({
  attemptAnswer: one(attemptAnswersTable, {
    fields: [numericAnswersTable.attemptAnswerId],
    references: [attemptAnswersTable.id],
  }),
  subQuestion: one(groupSubQuestionsTable, {
    fields: [numericAnswersTable.subQuestionId],
    references: [groupSubQuestionsTable.id],
  }),
}));

export const booleanAnswerRelations = relations(booleanAnswersTable, ({ one }) => ({
  attemptAnswer: one(attemptAnswersTable, {
    fields: [booleanAnswersTable.attemptAnswerId],
    references: [attemptAnswersTable.id],
  }),
  subQuestion: one(groupSubQuestionsTable, {
    fields: [booleanAnswersTable.subQuestionId],
    references: [groupSubQuestionsTable.id],
  }),
}));
