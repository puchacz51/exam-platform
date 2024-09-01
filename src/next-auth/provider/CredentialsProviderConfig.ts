import Credentials from 'next-auth/providers/credentials';
import { User } from 'next-auth';

import db from '@/lib/db';

import { usersTable } from '../../../schema/users';

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
