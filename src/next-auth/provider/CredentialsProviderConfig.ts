import Credentials from 'next-auth/providers/credentials';
import { User } from 'next-auth';

import { usersTable } from '@schemas/users';
import db from '@/lib/db';

export const credentialsProvider = Credentials({
  credentials: {
    email: {},
    password: {},
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error('Missing credentials');
    }

    const user = await db.select().from(usersTable);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return user as unknown as User;
  },
});
