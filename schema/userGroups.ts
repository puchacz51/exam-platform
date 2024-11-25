import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { usersTable } from '@schema/users';
import { groupsTable } from '@schema/groups';

export const userGroupsTable = pgTable('user_groups', {
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  groupId: uuid('group_id')
    .notNull()
    .references(() => groupsTable.id, { onDelete: 'cascade' }),
    
});

export const userGroupsRelations = relations(userGroupsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userGroupsTable.userId],
    references: [usersTable.id],
  }),
  group: one(groupsTable, {
    fields: [userGroupsTable.groupId],
    references: [groupsTable.id],
  }),
}));

export type InsertUserGroup = typeof userGroupsTable.$inferInsert;
export type SelectUserGroup = typeof userGroupsTable.$inferSelect;
