'use server';

import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

import { usersTable } from '@schema/users';
import db from '@/lib/db';
import { auth } from '@/next-auth/auth';

const updateProfileSchema = z.object({
  firstname: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastname: z.string().min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
  schoolIndex: z
    .number()
    .int()
    .min(0, 'Numer indeksu musi być liczbą nieujemną'),
});

export async function updateProfile(data: z.infer<typeof updateProfileSchema>) {
  const session = await auth();

  if (!session?.user?.userID) {
    return { error: 'Nie jesteś zalogowany' };
  }

  const validatedFields = updateProfileSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: 'Nieprawidłowe dane formularza',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstname, lastname, schoolIndex } = validatedFields.data;

  try {
    await db
      .update(usersTable)
      .set({
        firstname,
        lastname,
        schoolIndex,
      })
      .where(eq(usersTable.id, session.user.userID))
      .execute();

    revalidatePath('/dashboard/profile');
    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { error: 'Wystąpił błąd podczas aktualizacji profilu' };
  }
}

export async function getUserProfile() {
  const session = await auth();

  if (!session?.user?.userID) {
    return { error: 'Nie jesteś zalogowany' };
  }

  try {
    const user = await db
      .select({
        firstname: usersTable.firstname,
        lastname: usersTable.lastname,
        email: usersTable.email,
        schoolIndex: usersTable.schoolIndex,
      })
      .from(usersTable)
      .where(eq(usersTable.id, session.user.userID))
      .execute();

    if (!user[0]) {
      return { error: 'Użytkownik nie został znaleziony' };
    }

    return { data: user[0] };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { error: 'Wystąpił błąd podczas pobierania profilu' };
  }
}
