import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { userGroupsTable } from '@schema/userGroups';
import { usersTable } from '@schema/users';

import { testAccessGroupsTable } from './testAccessGroups';

export const groupsTable = pgTable('groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 1000 }),
  createdAt: timestamp('created_at').defaultNow(),
  ownerId: uuid('author_id').notNull(),
});

export const groupsRelations = relations(groupsTable, ({ many, one }) => ({
  userGroups: many(userGroupsTable),
  testAccessGroups: many(testAccessGroupsTable),
  owner: one(usersTable, {
    fields: [groupsTable.ownerId],
    references: [usersTable.id],
  }),
}));

export type InsertGroup = typeof groupsTable.$inferInsert;
export type SelectGroup = typeof groupsTable.$inferSelect;
