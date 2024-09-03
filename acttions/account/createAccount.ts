'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

import db from '@/lib/db';

import { InsertUser, usersTable } from '../../schema/users';
import { sendConfirmationEmail } from './sendConfirmationEmail';

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

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser: InsertUser = {
      firstname,
      lastname,
      email,
      passwordHash,
      authProvider: 'local',
      createdAt: new Date(),
    };

    const [insertedUser] = await db
      .insert(usersTable)
      .values(newUser)
      .returning();

    sendConfirmationEmail({
      ...insertedUser,
      locale: 'pl',
    });

    return { success: true, userId: insertedUser.id };
  } catch (error) {
    console.error('Błąd podczas rejestracji użytkownika:', error);
    return {
      error: 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.',
    };
  }
}
