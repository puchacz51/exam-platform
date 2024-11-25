'use server';

import { z } from 'zod';
import { ilike, or } from 'drizzle-orm';

import db from '@/lib/db';
import { usersTable } from '@schema/users';

const searchSchema = z.object({
  query: z.string().min(1),
  searchBy: z
    .array(z.enum(['firstname', 'lastname', 'email']))
    .default(['firstname', 'lastname']),
});

export type SearchParams = z.infer<typeof searchSchema>;

export async function searchUsers(params: SearchParams) {
  try {
    const validated = searchSchema.parse(params);

    const searchConditions = validated.searchBy.map((field) =>
      ilike(usersTable[field], `%${validated.query}%`)
    );

    const users = await db
      .select({
        id: usersTable.id,
        firstname: usersTable.firstname,
        lastname: usersTable.lastname,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(or(...searchConditions))
      .limit(10)
      .execute();

    return { success: true, users };
  } catch (error) {
    console.error('Error searching users:', error);
    return {
      error: 'An error occurred while searching users',
      success: false,
    };
  }
}
