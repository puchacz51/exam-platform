import {
  emailVerificationTokensTable,
  InsertEmailVerificationToken,
} from '@schemas/email_verification_tokens';

import db from '@/lib/db';

const TOKEN_EXPIRATION_HOURS = 24;
const TOKEN_LENGTH = 8;

const base62Chars =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

function generateUniqueToken(): string {
  const now = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  const combined = BigInt(now) * BigInt(1000000) + BigInt(random);

  let token = '';
  let value = combined;

  while (token.length < TOKEN_LENGTH) {
    token = base62Chars[Number(value % BigInt(62))] + token;
    value = value / BigInt(62);
  }

  return token.padStart(TOKEN_LENGTH, '0');
}

export async function generateEmailVerificationToken(
  email: string
): Promise<string> {
  const token = generateUniqueToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + TOKEN_EXPIRATION_HOURS);

  const newToken: InsertEmailVerificationToken = {
    token,
    userEmail: email,
    expiresAt,
  };

  await db.insert(emailVerificationTokensTable).values(newToken);

  return token;
}
