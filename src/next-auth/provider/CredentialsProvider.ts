import Credentials from 'next-auth/providers/credentials';
import { User } from 'next-auth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

import { usersTable } from '@schemas/users';
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

      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (!passwordMatch) {
        throw new Error('Invalid credentials');
      }

      return user as unknown as User;
    } catch (e) {
      console.log(e);

      return null;
    }
  },
});
