import { relations } from 'drizzle-orm';
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

import { questionsTable } from './questions';

export const categoriesTable = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
});

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  questions: many(questionsTable),
}));

export type InsertCategory = typeof categoriesTable.$inferInsert;
export type SelectCategory = typeof categoriesTable.$inferSelect;
