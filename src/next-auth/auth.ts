import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import db from '@/lib/db';

import { usersTable } from '../../schema/users';

export const { signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
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
      credentials: {
        email: {},
        password: {},
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
});
