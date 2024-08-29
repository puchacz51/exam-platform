import Credentials from 'next-auth/providers/credentials';

import db from '@/app/lib/db';

import { usersTable } from '../../../schema/users';

export const credentialsProvider = Credentials({
  credentials: {
    email: { label: 'Email', type: 'email' },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials, req) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error('Missing credentials');
    }

    const userExists = await db.select().from(usersTable);

    if (!userExists) {
      throw new Error('Invalid credentials');
    }

    return userExists;
  },
});
