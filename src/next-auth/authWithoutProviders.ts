import { NextAuthConfig } from 'next-auth';

export const authConfigWithProviders: NextAuthConfig = {
  providers: [],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, token, trigger }) {
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
  },
};
