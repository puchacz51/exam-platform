'use server';

import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { usersTable } from '@schema/users';
import db from '@/lib/db';
import { auth } from '@/next-auth/auth';

const profileSchema = z.object({
  firstname: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastname: z.string().min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
});

export async function completeProfile(data: z.infer<typeof profileSchema>) {
  const session = await auth();

  if (!session) {
    return { error: 'Not authenticated' };
  }

  if (
    !session.user ||
    !session.user.profileNeedsCompletion ||
    !session.user.email
  ) {
    return { error: 'Invalid session' };
  }

  const validatedFields = profileSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error };
  }

  const { firstname, lastname } = validatedFields.data;

  try {
    await db
      .update(usersTable)
      .set({
        firstname,
        lastname,
        profileNeedsCompletion: false,
      })
      .where(eq(usersTable.email, session.user.email))
      .execute();

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { error: 'Failed to update profile' };
  }
}
