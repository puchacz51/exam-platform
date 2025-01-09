'use server';

import { and, eq } from 'drizzle-orm';

import db from '@/lib/db';
import { verificationTokensTable } from '@schema/email_verification_tokens';
import { usersTable } from '@schema/users';

export async function verifyEmailToken(
  token: string,
  email: string
): Promise<boolean> {
  const result = await db
    .select()
    .from(verificationTokensTable)
    .where(
      and(
        eq(verificationTokensTable.token, token),
        eq(verificationTokensTable.userEmail, email)
      )
    )
    .limit(1);
  if (result.length === 0) {
    return false;
  }

  const verificationToken = result[0];

  if (verificationToken.expiresAt < new Date()) {
    await db
      .delete(verificationTokensTable)
      .where(
        and(
          eq(verificationTokensTable.token, token),
          eq(verificationTokensTable.userEmail, email)
        )
      );

    return false;
  }
  await db
    .update(usersTable)
    .set({ emailConfirmed: new Date() })
    .where(eq(usersTable.email, email));

  await db
    .delete(verificationTokensTable)
    .where(
      and(
        eq(verificationTokensTable.token, token),
        eq(verificationTokensTable.userEmail, email)
      )
    );

  return true;
}
