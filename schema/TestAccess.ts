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

import { testsTable } from './test';
import { usersTable } from './users';

export const testAccessTypeEnum = pgEnum('test_access_type', [
  'GROUP',
  'CODE',
  'EMAIL',
]);

export const testAccessConfigTable = pgTable('test_access_configs', {
  id: uuid('id').primaryKey().defaultRandom(),
  testId: uuid('test_id')
    .notNull()
    .references(() => testsTable.id, { onDelete: 'cascade' }),
  accessType: testAccessTypeEnum('access_type').notNull(),
  accessCode: varchar('access_code', { length: 20 }),
  groupId: uuid('group_id').references(() => usersTable.id),
  startsAt: timestamp('starts_at'),
  endsAt: timestamp('ends_at'),
  timeLimit: integer('time_limit'),
  maxAttempts: integer('max_attempts'),
  minTimeBetweenAttempts: integer('min_time_between_attempts'),
  requiresRegistration: boolean('requires_registration').default(true),
  showResultsAfterSubmission: boolean('show_results_after_submission').default(
    true
  ),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const testAccessConfigRelations = relations(
  testAccessConfigTable,
  ({ one }) => ({
    test: one(testsTable, {
      fields: [testAccessConfigTable.testId],
      references: [testsTable.id],
    }),
  })
);

export type InsertTestAccessConfig = typeof testAccessConfigTable.$inferInsert;
export type SelectTestAccessConfig = typeof testAccessConfigTable.$inferSelect;
