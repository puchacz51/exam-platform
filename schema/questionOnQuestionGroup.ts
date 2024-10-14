import {
  pgTable,
  primaryKey,
  unique,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionsTable } from './questions';
import { questionGroupsTable } from './questionGroups';

export const questionOnQuestionGroup = pgTable(
  'question_on_question_group',
  {
    questionId: uuid('question_id')
      .notNull()
      .references(() => questionsTable.id),
    questionGroupId: uuid('question_group_id')
      .notNull()
      .references(() => questionGroupsTable.id),
    order: varchar('order'),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.questionId, table.questionGroupId] }),
    uniqueOrder: unique('unique_order').on(table.questionGroupId, table.order),
  })
);

export type InsertQuestionOnQuestionGroup =
  typeof questionOnQuestionGroup.$inferInsert;
export type SelectQuestionOnQuestionGroup =
  typeof questionOnQuestionGroup.$inferSelect;

export const questionOnQuestionGroupRelations = relations(
  questionOnQuestionGroup,
  ({ one }) => ({
    question: one(questionsTable, {
      fields: [questionOnQuestionGroup.questionId],
      references: [questionsTable.id],
    }),
    questionGroup: one(questionGroupsTable, {
      fields: [questionOnQuestionGroup.questionGroupId],
      references: [questionGroupsTable.id],
    }),
  })
);
