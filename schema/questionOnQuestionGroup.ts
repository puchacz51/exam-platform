import { pgTable, primaryKey, smallint, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionGroupsTable } from '@schema/questionGroups';
import { questionsTable } from '@schema/questions';

export const questionOnQuestionGroupTable = pgTable(
  'question_on_question_group',
  {
    questionId: uuid('question_id')
      .notNull()
      .references(() => questionsTable.id, { onDelete: 'cascade' }),
    questionGroupId: uuid('question_group_id')
      .notNull()
      .references(() => questionGroupsTable.id, { onDelete: 'cascade' }),
    order: smallint('order'),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.questionId, table.questionGroupId] }),
  })
);

export type InsertQuestionOnQuestionGroup =
  typeof questionOnQuestionGroupTable.$inferInsert;
export type SelectQuestionOnQuestionGroup =
  typeof questionOnQuestionGroupTable.$inferSelect;

export const questionOnQuestionGroupRelations = relations(
  questionOnQuestionGroupTable,
  ({ one }) => ({
    question: one(questionsTable, {
      fields: [questionOnQuestionGroupTable.questionId],
      references: [questionsTable.id],
    }),
    questionGroup: one(questionGroupsTable, {
      fields: [questionOnQuestionGroupTable.questionGroupId],
      references: [questionGroupsTable.id],
    }),
  })
);
