import NextAuth, { NextAuthConfig } from 'next-auth';
import { eq } from 'drizzle-orm';

import { usersTable } from '@schema/users';
import db from '@/lib/db';
import { AzureADProvider } from '@/next-auth/provider/AzureADProvider';
import { CredentialsProvider } from '@/next-auth/provider/CredentialsProvider';
import { authConfigWithProviders } from '@/next-auth/authWithoutProviders';
import { GoogleProvider } from '@/next-auth/provider/GoogleProvider';

export const authConfig: NextAuthConfig = {
  ...authConfigWithProviders,
  providers: [AzureADProvider, CredentialsProvider, GoogleProvider],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          authProvider: token.user.authProvider,
          userID: token.user.userID,
          email: token.user.email,
          profileNeedsCompletion: token.user.profileNeedsCompletion,
          firstname: token.user.firstname,
          lastname: token.user.lastname,
          emailConfirmed: token.user.emailConfirmed,
          emailVerified: token.user.emailConfirmed,
          id: '',
          createdAt: token.user.createdAt,
          accessToken: token.user.accessToken,
        };
      }

      return session;
    },
    async jwt({ token, user, trigger }) {
      if (trigger === 'update') {
        const userId = token.user.userID;
        const [userUpdated] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.id, userId))
          .execute();

        if (!userUpdated) return null;

        token.user = {
          authProvider: userUpdated.authProvider as string,
          userID: userUpdated.id,
          email: userUpdated.email as string,
          profileNeedsCompletion: userUpdated.profileNeedsCompletion,
          firstname: userUpdated.firstname,
          lastname: userUpdated.lastname,
          emailConfirmed: userUpdated.emailConfirmed,
          createdAt: userUpdated.createdAt,
          accessToken: token.user.accessToken,
          refreshToken: token.user.refreshToken,
        };

        return token;
      }

      if (user) {
        token.user = {
          authProvider: user.authProvider,
          userID: user.userID,
          email: user.email as string,
          profileNeedsCompletion: user.profileNeedsCompletion,
          firstname: user.firstname,
          lastname: user.lastname,
          emailConfirmed: user.emailConfirmed,
          createdAt: user.createdAt,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        };
      }

      return token;
    },
  },
};

export const { signOut, auth, handlers, signIn } = NextAuth(authConfig);
