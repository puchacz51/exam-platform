import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { testAttemptsTable } from '@schema/testAttempt';
import { testsTable } from '@schema/test';
import { usersTable } from '@schema/users';
import { testAccessGroupsTable } from '@schema/testAccessGroups';

export const testAccessTypeEnum = pgEnum('test_access_type', [
  'GROUP',
  'CODE',
  'CODE_GROUP',
]);

export const testAccessConfigTable = pgTable('test_access_configs', {
  id: uuid('id').primaryKey().defaultRandom(),
  testId: uuid('test_id')
    .notNull()
    .references(() => testsTable.id, { onDelete: 'cascade' }),
  accessType: testAccessTypeEnum('access_type').notNull(),
  accessCode: varchar('access_code', { length: 20 }),
  startsAt: timestamp('starts_at'),
  endsAt: timestamp('ends_at'),
  timeLimit: integer('time_limit'),
  assignedBy: uuid('assigned_by')
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const testAccessConfigRelations = relations(
  testAccessConfigTable,
  ({ one, many }) => ({
    test: one(testsTable, {
      fields: [testAccessConfigTable.testId],
      references: [testsTable.id],
    }),
    TAGroup: many(testAccessGroupsTable),
    assignedByUser: one(usersTable, {
      fields: [testAccessConfigTable.assignedBy],
      references: [usersTable.id],
    }),
    attempts: many(testAttemptsTable),
  })
);

export type InsertTestAccessConfig = typeof testAccessConfigTable.$inferInsert;
export type SelectTestAccessConfig = typeof testAccessConfigTable.$inferSelect;
