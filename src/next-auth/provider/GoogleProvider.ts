import Google from 'next-auth/providers/google';
import { eq } from 'drizzle-orm';

import { usersTable } from '@schema/users';
import db from '@/lib/db';

export const GoogleProvider = Google({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  profile: async (profile, tokens) => {
    const email = profile.email;
    const [existingUser] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .execute();

    if (!existingUser) {
      const [newUser] = await db
        .insert(usersTable)
        .values({
          email: email,
          passwordHash: '',
          profileNeedsCompletion: true,
          authProvider: 'google',
          emailConfirmed: new Date(),
        })
        .returning()
        .execute();
      console.log('newUser, tokens', newUser, tokens);
      return {
        authProvider: 'google',
        createdAt: newUser.createdAt,
        emailConfirmed: newUser.emailConfirmed,
        email: newUser.email,
        firstname: '',
        lastname: '',
        profileNeedsCompletion: newUser.profileNeedsCompletion,
        userID: newUser.id,
        accessToken: tokens['access_token'] as string,
        refreshToken: tokens['refresh_token'] as string,
      };
    }

    return {
      authProvider: 'google',
      createdAt: existingUser.createdAt,
      emailConfirmed: existingUser.emailConfirmed,
      email: existingUser.email,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      profileNeedsCompletion: existingUser.profileNeedsCompletion,
      userID: existingUser.id,
      accessToken: tokens['access_token'] as string,
      refreshToken: tokens['refresh_token'] as string,
    };
  },
});
