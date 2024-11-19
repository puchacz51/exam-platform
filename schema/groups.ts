import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { userGroupsTable } from '@schema/userGroups';
import { groupTeamsTable } from '@schema/groupTeams';

export const groupsTable = pgTable('groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  description: varchar('description', { length: 1000 }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const groupsRelations = relations(groupsTable, ({ many }) => ({
  userGroups: many(userGroupsTable),
  groupTeams: many(groupTeamsTable),
}));

export type InsertGroup = typeof groupsTable.$inferInsert;
export type SelectGroup = typeof groupsTable.$inferSelect;
