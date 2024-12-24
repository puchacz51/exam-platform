import { createHash } from 'node:crypto';

import Credentials from 'next-auth/providers/credentials';
import { eq } from 'drizzle-orm';

import { usersTable } from '@schema/users';
import db from '@/lib/db';

export const CredentialsProvider = Credentials({
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error('Missing credentials');
    }

    const { email, password } = credentials as {
      email: string;
      password: string;
    };
    try {
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .execute();

      if (!user) {
        throw new Error('Invalid credentials');
      }
      const correctUserPasswordHash = user.passwordHash;
      const userSalt = user.salt;

      const passwordMatch =
        createHash('sha256')
          .update(password + userSalt)
          .digest('hex') === correctUserPasswordHash;

      if (!passwordMatch) {
        throw new Error('Invalid credentials');
      }

      return {
        email: user.email,
        authProvider: user.authProvider,
        userID: user.id,
        profileNeedsCompletion: user.profileNeedsCompletion,
        firstname: user.firstname,
        lastname: user.lastname,
        createdAt: user.createdAt,
        emailConfirmed: user.emailConfirmed,
      };
    } catch (e) {
      return null;
    }
  },
});
