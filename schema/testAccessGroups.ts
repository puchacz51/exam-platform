import { pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { testAccessConfigTable } from '@schema/testAccesss';
import { groupsTable } from '@schema/groups';

export const testAccessGroupSourceTypeEnum = pgEnum(
  'test_access_group_source_type',
  ['INTERNAL', 'TEAMS']
);

export const testAccessGroupsTable = pgTable('test_access_groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  testAccessConfigId: uuid('test_access_config_id')
    .notNull()
    .references(() => testAccessConfigTable.id, { onDelete: 'cascade' }),
  groupId: uuid('group_id')
    .references(() => groupsTable.id, { onDelete: 'cascade' }),
  sourceType: testAccessGroupSourceTypeEnum('source_type')
    .notNull()
    .default('INTERNAL'),
  externalId: varchar('external_id', { length: 256 }),
});

export const testAccessGroupsRelations = relations(
  testAccessGroupsTable,
  ({ one }) => ({
    TAGroup: one(testAccessConfigTable, {
      fields: [testAccessGroupsTable.testAccessConfigId],
      references: [testAccessConfigTable.id],
    }),
    group: one(groupsTable, {
      fields: [testAccessGroupsTable.groupId],
      references: [groupsTable.id],
    }),
  })
);
