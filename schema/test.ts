import {
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
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 256 }),
  description: text('description'),
  creatorId: uuid('creator_id').references(() => usersTable.id),
  categoryId: uuid('category_id').references(() => categoriesTable.id),
  accessType: accessTypeEnum('access_type').notNull(),
  accessCode: varchar('access_code', { length: 20 }),
  createdAt: timestamp('created_at'),
});

export type InsertTest = typeof testsTable.$inferInsert;
export type SelectTest = typeof testsTable.$inferSelect;
