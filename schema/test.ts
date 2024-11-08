import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { usersTable } from './users';
import { categoriesTable } from './categories';
import { questionGroupsTable } from './questionGroups';

export const accessTypeEnum = pgEnum('access_type', [
  'PUBLIC',
  'CODE',
  'RESTRICTED',
]);

export type TestAccessType =
  (typeof accessTypeEnum)[keyof typeof accessTypeEnum];

export const testsTable = pgTable('tests', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 256 }),
  description: text('description'),
  creatorId: uuid('creator_id').references(() => usersTable.id),
  categoryId: uuid('category_id').references(() => categoriesTable.id),
  createdAt: timestamp('created_at'),
});

export const testsRelations = relations(testsTable, ({ one, many }) => ({
  creator: one(usersTable, {
    fields: [testsTable.creatorId],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [testsTable.categoryId],
    references: [categoriesTable.id],
  }),
  questionGroups: many(questionGroupsTable),
}));

export type InsertTest = typeof testsTable.$inferInsert;
export type SelectTest = typeof testsTable.$inferSelect;
