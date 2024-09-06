import NextAuth from 'next-auth';

import { CredentialsProvider } from './provider/CredentialsProvider';
import { AzureADProvider } from './provider/AzureADProvider';

const authOptions = NextAuth({
  providers: [CredentialsProvider, AzureADProvider],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
});

export const { signOut, auth, handlers, signIn } = authOptions;
