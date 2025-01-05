'use server';

import { createHash, randomBytes } from 'node:crypto';

import { z } from 'zod';
import { eq } from 'drizzle-orm';

import { InsertUser, usersTable } from '@schema/users';
import db from '@/lib/db';
import { sendConfirmationEmail } from '@actions/account/sendConfirmationEmail';

const registrationSchema = z.object({
  firstname: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastname: z.string().min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
  email: z.string().email('Nieprawidłowy adres email'),
  password: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków'),
});

export async function registerUser(formData: FormData) {
  const validatedFields = registrationSchema.safeParse({
    firstname: formData.get('firstName'),
    lastname: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return { error: 'Nieprawidłowe dane formularza' };
  }

  const { firstname, lastname, email, password } = validatedFields.data;

  try {
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .execute();

    if (existingUser.length > 0) {
      return { error: 'Użytkownik o podanym adresie email już istnieje' };
    }

    const salt = randomBytes(16).toString('hex');
    const passwordHash = createHash('sha256')
      .update(password + salt)
      .digest('hex');

    const newUser: InsertUser = {
      firstname,
      lastname,
      email,
      passwordHash,
      salt,
      authProvider: 'local',
      createdAt: new Date(),
    };

    return await db.transaction(async (tx) => {
      const [insertedUser] = await tx
        .insert(usersTable)
        .values(newUser)
        .returning();

      await sendConfirmationEmail({
        ...insertedUser,
        locale: 'pl',
        tx,
      });

      return { success: true, userId: insertedUser.id };
    });
  } catch (error) {
    return {
      error: 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.',
    };
  }
}
