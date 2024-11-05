import { boolean, integer, pgTable, real, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { questionGroupsTable } from './questionGroups';
import { testSettingsTable } from './testSettings';

export const groupSettingsTable = pgTable('group_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  testSettingsId: uuid('test_settings_id').references(
    () => testSettingsTable.id
  ),
  questionGroupId: uuid('question_group_id').references(
    () => questionGroupsTable.id
  ),

  timeLimit: integer('time_limit'),
  minimumTimeSpent: integer('minimum_time_spent'),
  weightMultiplier: real('weight_multiplier').default(1),
  allowReview: boolean('allow_review').default(true),
  requiredToPass: boolean('required_to_pass').default(false),
  minimumScore: real('minimum_score'),
});

export const groupSettingsRelations = relations(
  groupSettingsTable,
  ({ one }) => ({
    testSettings: one(testSettingsTable, {
      fields: [groupSettingsTable.testSettingsId],
      references: [testSettingsTable.id],
    }),
    questionGroup: one(questionGroupsTable, {
      fields: [groupSettingsTable.questionGroupId],
      references: [questionGroupsTable.id],
    }),
  })
);

export type InsertGroupSettings = typeof groupSettingsTable.$inferInsert;
export type SelectGroupSettings = typeof groupSettingsTable.$inferSelect;
