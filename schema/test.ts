import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { testSettingsTable } from '@schema/testSettings';
import { usersTable } from '@schema/users';
import { questionGroupsTable } from '@schema/questionGroups';

export const accessTypeEnum = pgEnum('access_type', [
  'PUBLIC',
  'CODE',
  'RESTRICTED',
]);

export type TestAccessType =
  (typeof accessTypeEnum)[keyof typeof accessTypeEnum];

export const testsTable = pgTable('tests', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  creatorId: uuid('creator_id')
    .references(() => usersTable.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const testsRelations = relations(testsTable, ({ one, many }) => ({
  creator: one(usersTable, {
    fields: [testsTable.creatorId],
    references: [usersTable.id],
  }),

  QG: many(questionGroupsTable),
  settings: one(testSettingsTable, {
    fields: [testsTable.id],
    references: [testSettingsTable.testId],
  }),
}));

export type InsertTest = typeof testsTable.$inferInsert;
export type SelectTest = typeof testsTable.$inferSelect;
