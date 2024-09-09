'use server';

import { and, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { emailVerificationTokensTable } from '@schema/email_verification_tokens';
import { usersTable } from '@schema/users';

export async function verifyEmailToken(
  token: string,
  email: string
): Promise<boolean> {
  const result = await db
    .select()
    .from(emailVerificationTokensTable)
    .where(
      and(
        eq(emailVerificationTokensTable.token, token),
        eq(emailVerificationTokensTable.userEmail, email)
      )
    )
    .limit(1);
  console.log(result);
  if (result.length === 0) {
    return false;
  }

  const verificationToken = result[0];

  if (verificationToken.expiresAt < new Date()) {
    await db
      .delete(emailVerificationTokensTable)
      .where(
        and(
          eq(emailVerificationTokensTable.token, token),
          eq(emailVerificationTokensTable.userEmail, email)
        )
      );

    return false;
  }
  await db
    .update(usersTable)
    .set({ emailConfirmed: new Date() })
    .where(eq(usersTable.email, email));

  await db
    .delete(emailVerificationTokensTable)
    .where(
      and(
        eq(emailVerificationTokensTable.token, token),
        eq(emailVerificationTokensTable.userEmail, email)
      )
    );

  return true;
}
