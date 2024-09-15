import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const questionTypesTable = pgTable('question_types', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: text('description'), // opis typu pytania
});

export type InsertQuestionType = typeof questionTypesTable.$inferInsert;
export type SelectQuestionType = typeof questionTypesTable.$inferSelect;
