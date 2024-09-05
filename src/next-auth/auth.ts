import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

import { usersTable } from '@schemas/users';
import db from '@/lib/db';

export const { signOut, auth, handlers, signIn } = NextAuth({
  providers: [
    Credentials({
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

          const passwordMatch = await bcrypt.compare(
            password,
            user.passwordHash
          );

          if (!passwordMatch) {
            throw new Error('Invalid credentials');
          }

          return user as unknown as User;
        } catch (e) {
          console.log(e);

          return null;
        }
      },
    }),
    // AzureAD({
    //   clientId: 'b606b625-9f9a-42a6-aa59-86b7734070d9',
    //   clientSecret: 'Hx18Q~WJlQgSJKZeJBCidBfc6SmPtZs7~TNYdb1p',
    //   tenantId: '1acdc1b3-6f10-4b9b-ac4b-93b3104cda07',
    //   authorization: { params: { scope: 'openid profile email' } },
    //   profile(profile) {
    //     return {
    //       id: profile.oid,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //     };
    //   },
    // }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
});
