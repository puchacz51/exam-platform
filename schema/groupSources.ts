import { pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { groupsTable } from '@schema/groups';

export const groupSourceTypeEnum = pgEnum('group_source_type', [
  'INTERNAL',
  'TEAMS',
]);

export const groupSourcesTable = pgTable('group_sources', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('group_id')
    .notNull()
    .references(() => groupsTable.id, { onDelete: 'cascade' }),
  sourceType: groupSourceTypeEnum('source_type').notNull(),
  externalId: varchar('external_id', { length: 256 }),
});

export const groupSourcesRelations = relations(
  groupSourcesTable,
  ({ one }) => ({
    group: one(groupsTable, {
      fields: [groupSourcesTable.groupId],
      references: [groupsTable.id],
    }),
  })
);

export type InsertGroupSource = typeof groupSourcesTable.$inferInsert;
export type SelectGroupSource = typeof groupSourcesTable.$inferSelect;
