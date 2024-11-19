import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { groupsTable } from './groups';

export const groupTeamsTable = pgTable('group_teams', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('group_id').notNull(),
  testId: uuid('test_id').notNull(),
});

export const groupTeamsRelations = relations(groupTeamsTable, ({ one }) => ({
  group: one(groupsTable, {
    fields: [groupTeamsTable.groupId],
    references: [groupsTable.id],
  }),
}));

export type InsertGroupTeam = typeof groupTeamsTable.$inferInsert;
export type SelectGroupTeam = typeof groupTeamsTable.$inferSelect;
