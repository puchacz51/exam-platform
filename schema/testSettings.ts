import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  real,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { testsTable } from './test';
import { groupSettingsTable } from './groupSettings';

export const navigationModeEnum = pgEnum('navigation_mode', [
  'FREE',
  'SEQUENTIAL',
  'GROUP_LOCK',
  'ANSWER_LOCK',
]);

export const scoringSystemEnum = pgEnum('scoring_system', [
  'STANDARD',
  'NEGATIVE',
  'WEIGHTED',
  'PARTIAL',
]);

export const questionDisplayModeEnum = pgEnum('question_display_mode', [
  'ALL',
  'GROUP',
  'SINGLE',
  'CUSTOM',
]);

export const testSettingsTable = pgTable('test_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  testId: uuid('test_id').references(() => testsTable.id, {
    onDelete: 'cascade',
  }),
  isDefault: boolean('is_default').default(false),

  navigationMode: navigationModeEnum('navigation_mode').notNull(),
  allowGoBack: boolean('allow_go_back').default(true),
  confirmBeforeGroupChange: boolean('confirm_before_group_change').default(
    true
  ),

  scoringSystem: scoringSystemEnum('scoring_system').notNull(),
  allowPartialPoints: boolean('allow_partial_points').default(true),
  minimumPointsPerQuestion: real('minimum_points_per_question').default(0),
  negativePointsPercentage: real('negative_points_percentage').default(0),
  roundingPrecision: integer('rounding_precision').default(2),

  questionDisplayMode: questionDisplayModeEnum(
    'question_display_mode'
  ).notNull(),
  questionsPerPage: integer('questions_per_page'),
  shuffleQuestionsInGroup: boolean('shuffle_questions_in_group').default(false),
  shuffleAnswers: boolean('shuffle_answers').default(false),

  showProgressBar: boolean('show_progress_bar').default(true),
  showTimeRemaining: boolean('show_time_remaining').default(true),
  showQuestionPoints: boolean('show_question_points').default(true),
  allowQuestionFlagging: boolean('allow_question_flagging').default(true),
  autosaveInterval: integer('autosave_interval').default(60),

  showPartialResults: boolean('show_partial_results').default(false),
  showCorrectAnswers: boolean('show_correct_answers').default(false),
  showPointsPerQuestion: boolean('show_points_per_question').default(true),
  showFinalScore: boolean('show_final_score').default(true),

  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const testSettingsRelations = relations(
  testSettingsTable,
  ({ one, many }) => ({
    test: one(testsTable, {
      fields: [testSettingsTable.testId],
      references: [testsTable.id],
    }),
    groupSettings: many(groupSettingsTable),
  })
);

export type InsertTestSettings = typeof testSettingsTable.$inferInsert;
export type SelectTestSettings = typeof testSettingsTable.$inferSelect;
