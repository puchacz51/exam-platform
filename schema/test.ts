import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { usersTable } from './users';
import { categoriesTable } from './categories';
import { questionsTable } from './questions';

export const accessTypeEnum = pgEnum('access_type', [
  'public',
  'code',
  'restricted',
]);

export type TestAccessType =
  (typeof accessTypeEnum)[keyof typeof accessTypeEnum];

export const testsTable = pgTable('tests', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  description: text('description'),
  creatorID: integer('creator_id').references(() => usersTable.id),
  categoryID: integer('category_id').references(() => categoriesTable.id),
  accessType: accessTypeEnum('access_type').notNull(),
  accessCode: varchar('access_code', { length: 20 }),
  createdAt: timestamp('created_at'),
});

export const testsRelations = relations(testsTable, ({ many, one }) => ({
  questions: many(questionsTable),
  creator: one(usersTable, {
    fields: [testsTable.creatorID],
    references: [usersTable.id],
  }),
  category: one(categoriesTable, {
    fields: [testsTable.categoryID],
    references: [categoriesTable.id],
  }),
}));

export type InsertTest = typeof testsTable.$inferInsert;
export type SelectTest = typeof testsTable.$inferSelect;
