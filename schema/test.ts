import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

import { usersTable } from './users';
import { categoriesTable } from './categories';

export const accessTypeEnum = pgEnum('access_type', [
  'PUBLIC',
  'CODE',
  'RESTRICTED',
]);

export type TestAccessType =
  (typeof accessTypeEnum)[keyof typeof accessTypeEnum];

export const testsTable = pgTable('tests', {
  id: uuid('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  description: text('description'),
  creatorId: integer('creator_id').references(() => usersTable.id),
  categoryId: integer('category_id').references(() => categoriesTable.id),
  accessType: accessTypeEnum('access_type').notNull(),
  accessCode: varchar('access_code', { length: 20 }),
  createdAt: timestamp('created_at'),
});

// export const testsRelations = relations(testsTable, ({ many, one }) => ({
//   questionsGroups: many(questionGroupsTable),
//   creator: one(usersTable, {
//     fields: [testsTable.creatorID],
//     references: [usersTable.id],
//   }),
//   category: one(categoriesTable, {
//     fields: [testsTable.categoryID],
//     references: [categoriesTable.id],
//   }),
// }));

export type InsertTest = typeof testsTable.$inferInsert;
export type SelectTest = typeof testsTable.$inferSelect;
